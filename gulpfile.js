const gulp = require("gulp");
const concat = require("gulp-concat");
const BrowserSync = require("browser-sync");
const dart_sass = require("sass");
const gulp_sass = require("gulp-sass");
const BemBuilder = require("gulp-bem-bundle-builder");
const bem_bundler = require("gulp-bem-bundler-fs");
const debug = require("gulp-debug");
const bemxjst = require("gulp-bem-xjst");
const merge = require("merge2");
const through2_filter = require("through2-filter");
const css_freezer = require("gulp-css-freezer");
const postcss = require("gulp-postcss");
const postcss_url_plugin = require("postcss-url");
const one_of = require("gulp-one-of");


const SOURCE_PATH = "src";
const SOURCE_PATHS = {
    static: `${SOURCE_PATH}/static`,
    pages: `${SOURCE_PATH}/pages`,
    assets: `${SOURCE_PATH}/assets`,
    blocks: `${SOURCE_PATH}/blocks`,
};
const BUILD_PATH = "build"


const ym_path = require.resolve("ym");
const filter = through2_filter.obj;
const sass = gulp_sass(dart_sass);
const bemhtml = bemxjst.bemhtml;
const to_html = bemxjst.toHtml;
const browser_sync = BrowserSync.create();
const bem_builder = BemBuilder({
    levels: [
        "node_modules/bem-core/common.blocks",
        "node_modules/bem-core/desktop.blocks",
        "node_modules/bem-components/common.blocks",
        "node_modules/bem-components/desktop.blocks",
        "node_modules/bem-components/design/common.blocks",
        "node_modules/bem-components/design/desktop.blocks",
        SOURCE_PATHS.blocks,
    ],
    techMap: {
        bemhtml: ["bemhtml.js"],
        js: ["js", "vanilla.js", "browser.js"],
        css: ["sass", "css"],
    },
});


function build_pages() {
    return (
        bem_bundler(`${SOURCE_PATHS.pages}/*`)
        .pipe(bem_builder({
            css: page =>
                (
                    page.src("css")
                        .pipe(one_of())
                        .pipe(sass().on("error", sass.logError))
                        .pipe(postcss([
                            postcss_url_plugin({url: "inline"}),
                        ]))
                        .pipe(concat(page.name + '.min.css'))
                ),
            js: page =>
                (
                    merge(
                        gulp.src(ym_path),
                        page.src("js")
                            .pipe(filter(f => ~["vanilla.js", "browser.js", "js"].indexOf(f.tech))),
                        page.src("js")
                            .pipe(filter(file => file.tech === "bemhtml.js"))
                            .pipe(concat("browser.bemhtml.js"))
                            .pipe(bemhtml({elemJsInstances: true, exportName: "BEMHTML"})),
                    )
                    .pipe(concat(page.name + ".min.js"))
                ),
            tmpls: page =>
                (
                    page.src("bemhtml")
                        .pipe(concat("any.bemhtml.js"))
                        .pipe(bemhtml({elemJsInstances: true}))
                        .pipe(concat(page.name + ".bemhtml.js"))
                ),
            html: page => {
                const bemhtml_apply = () => to_html(page.target("tmpls"));
                return (
                    gulp
                        .src(page.dirname + "/*.bemjson.js")
                        .pipe(bemhtml_apply())
                );
            }
       }))
       .on("error", console.error)
       .pipe(debug())
       .pipe(gulp.dest(BUILD_PATH))
    );
};

function build_assets() {
    return (
        gulp
        .src(`${SOURCE_PATHS.assets}/**/*`)
        .pipe(gulp.dest(`${BUILD_PATH}/assets`))
    );
}

function build_static() {
    return (
        gulp
        .src(`${SOURCE_PATHS.static}/**/*`)
        .pipe(gulp.dest(`${BUILD_PATH}/static`))
    );
}

let build = gulp.parallel(build_static, build_assets, build_pages)

function dev() {
    browser_sync.init({server: {baseDir: BUILD_PATH}, open: false});
    // Static
    gulp.watch(
        `${SOURCE_PATH}/**/*`,
        gulp.parallel(_reloadbrowser_sync, build),
    );
}

function _reloadbrowser_sync(next) {
    browser_sync.reload();
    next();
}


exports.build_static = build_static;
exports.build_assets = build_assets;
exports.build_pages = build_pages;
exports.build = build;
exports.dev = dev;
exports.default = dev;
