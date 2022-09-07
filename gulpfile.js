let gulp = require("gulp");
let concat = require("gulp-concat");
let concatCss = require("gulp-concat-css");
let browserSync = require("browser-sync");
let sass = require('gulp-sass')(require('sass'));
let pug = require("gulp-pug");


const sourcePath = "src";
const buildPath = "build";
const blocksPath = `${sourcePath}/blocks`
const blocksGlobPaths = {
    sass: `${blocksPath}/**/block.sass`,
    js: `${blocksPath}/**/block.js`,
}
const pagesPath = `${sourcePath}/pages`
const pagesGlobPaths = {
    pug: `${pagesPath}/*.pug`,
}


let BrowserSync = browserSync.create();


function build_static() {
    return (
        gulp
        .src(`${sourcePath}/static/**`)
        .pipe(gulp.dest(`${buildPath}/static/`))
    )
}

function dev() {
    BrowserSync.init({server: {baseDir: sourcePath}, open: false});
    gulp.watch(blocksGlobPaths["js"], gulp.series(build_js, _browser_sync_reload));
    gulp.watch(blocksGlobPaths["sass"], gulp.series(build_css, _browser_sync_reload));
    gulp.watch(pagesGlobPaths["pug"], gulp.series(build_pages, _browser_sync_reload));
}

function _browser_sync_reload(done) {
    BrowserSync.reload();
    done();
}

function _build_pages_pug() {
    return (
        gulp
        .src(pagesGlobPaths["pug"])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(buildPath))
    )
}

function _build_blocks_css() {
    return (
        gulp
        .src(blocksGlobPaths["sass"])
        .pipe(sass().on("error", sass.logError))
        .pipe(concatCss("style.css", {commonBase: sourcePath, rebaseUrls: false}))
        .pipe(gulp.dest(buildPath))
    );
}

function _build_blocks_js() {
    return (
        gulp
        .src(blocksGlobPaths["js"])
        .pipe(concat("script.js"))
        .pipe(gulp.dest(buildPath))
    );
}


build_blocks = gulp.parallel(_build_blocks_css, _build_blocks_js);
build_pages = gulp.parallel(_build_pages_pug);
build = gulp.parallel(build_blocks, build_pages, build_static);


exports.build_static = build_static;
exports.build_blocks = build_blocks;
exports.build_pages = build_pages;
exports.build = build;
exports.dev = dev;
exports.default = dev;
