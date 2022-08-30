let gulp = require("gulp");
let concat = require("gulp-concat");
let concatCss = require("gulp-concat-css");
let browserSync = require("browser-sync");
let Filter = require("gulp-filter");
let sass = require('gulp-sass')(require('sass'));


const basePath = "src/";
let BrowserSync = browserSync.create();


gulp.task("build-css", function () {
    let sassus_filter = Filter('**/*.sass', {restore: true})

    return (
        gulp
        .src(`${basePath}blocks/**/*.{sass,css}`)
        // If Sass
        .pipe(sassus_filter)
        .pipe(sass().on("error", sass.logError))
        .pipe(sassus_filter.restore)

        .pipe(concatCss("style.css", {commonBase: basePath, rebaseUrls: false}))
        .pipe(gulp.dest(basePath))
    );
});

gulp.task("build-js", function () {
    return (
        gulp
        .src(`${basePath}blocks/**/*.js`)
        .pipe(concat("script.js"))
        .pipe(gulp.dest(basePath))
    );
});

gulp.task("browser-sync", function() {
    BrowserSync.init({server: {baseDir: basePath}});
});

gulp.task("browser-sync-reload", function(done) {
    BrowserSync.reload();
    done();
});

gulp.task("dev", gulp.series(function() {
    BrowserSync.init({server: {baseDir: basePath}, open: false});
    gulp.watch(`${basePath}blocks/**/*.js`, gulp.series("build-js", "browser-sync-reload"));
    gulp.watch(`${basePath}blocks/**/*.{sass,css}`, gulp.series("build-css", "browser-sync-reload"));
    gulp.watch(`${basePath}*.html`, gulp.series("browser-sync-reload"));
}));

gulp.task("default", gulp.series("dev"));
