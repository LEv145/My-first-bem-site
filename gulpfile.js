"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync");
const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const BemBuilder = require("gulp-bem-bundle-builder");
const bundler = require("gulp-bem-bundler-fs");
const debug = require("gulp-debug");
const bemxjst = require("gulp-bem-xjst");
// const through2Filter = require("through2-filter");


const sourcePath = "src";
const blocksPath = `${sourcePath}/blocks`
const bundlesPath = `${sourcePath}/bundles`
const buildPath = "build"

const sass = gulpSass(dartSass);
const bemhtml = bemxjst.bemhtml;
const toHtml = bemxjst.toHtml;
const BrowserSync = browserSync.create();
const bemBuilder = BemBuilder({
    levels: [
        "node_modules/bem-core/common.blocks",
        "node_modules/bem-core/desktop.blocks",
        "node_modules/bem-components/common.blocks",
        "node_modules/bem-components/desktop.blocks",
        "node_modules/bem-components/design/common.blocks",
        "node_modules/bem-components/design/desktop.blocks",
        blocksPath,
    ],
    techMap: {
        bemhtml: ["bemhtml.js"],
        js: ["js"],
        css: ["sass", "css"],
    },
});


function build() {
    return (
        bundler(`${bundlesPath}/*`)
        .pipe(bemBuilder({
            css: bundle =>
                (
                    bundle.src("css")
                    .pipe(sass().on("error", sass.logError))
                    .pipe(concat(bundle.name + ".min.css"))
                ),
            js: bundle =>
                (
                    bundle.src("js")
                    .pipe(concat(bundle.name + ".min.js"))
                ),
            tmpls: bundle =>
                (
                    bundle.src("bemhtml")
                    .pipe(concat("any.bemhtml.js"))
                    .pipe(bemhtml({elemJsInstances: true}))
                    .pipe(concat(bundle.name + ".bemhtml.js"))
                ),
            html: bundle => {
                const bemhtmlApply = () => toHtml(bundle.target("tmpls"));
                return (
                    gulp
                    .src(bundle.dirname + "/*.bemjson.js")
                    .pipe(bemhtmlApply())
                );
            }
       }))
       .on("error", console.error)
       .pipe(debug())
       .pipe(gulp.dest(buildPath))
    );
};

function dev() { 
    BrowserSync.init({server: {baseDir: buildPath}, open: false});
    // Blocks
    gulp.watch(
        `${blocksPath}/**/*.{sass,css,js}`, 
        gulp.series(build, _reloadBrowserSync),
    );
    // Bundles
    gulp.watch(
        `${bundlesPath}/*/*.{bemjson.js}`, 
        _reloadBrowserSync,
    );
}

function _reloadBrowserSync(next) {
    BrowserSync.reload();
    next();
}


exports.build = build;
exports.dev = dev;
exports.default = dev;
