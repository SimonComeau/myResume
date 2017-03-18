// TODO: run only if files are modified, on every run of build update json file with 2 value, last date css date last date js date, go through src files and get newest modified date, investigate CHECKSUM, build css only if css is required, build js only if js is required
// TODO: only minify or uglify on production not debug environment
// TODO: restart watch if an error is hit
var gulp = require("gulp");
var minify = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var watch = require("gulp-watch");

var src = {
    css: ["bower_components/bootstrap/dist/css/bootstrap.css",
        "bower_components/angular-bootstrap/ui-bootstrap-csp.css",
        "bower_components/angular-material/angular-material.css",
        "app/authentication/login.view.css",
        "app/message/contactMe.view.css"],
    js: ["bower_components/angular/angular.js",
        "bower_components/angular-ui-router/release/angular-ui-router.js",
        "bower_components/jquery/dist/jquery.js",
        "bower_components/bootstrap/dist/js/bootstrap.js",
        "bower_components/angular-bootstrap/ui-bootstrap.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-aria/angular-aria.js",
        "bower_components/angular-material/angular-material.js",
        "bower_components/js-sha512/build/sha512.min.js",
        "app/app.js",
        "app/state/state.config.js",
        "app/state/state.events.run.js",
        "app/authentication/authentication.service.js",
        "app/home/menu.controller.js",
        "app/home/home.controller.js",
        "app/message/message.controller.js",
        "app/authentication/authentication.controller.js",
        "app/portfolio/portfolio.controller.js"]
};
var buildCss = function () {
    return gulp.src(src.css)
        .pipe(concat("all.css"))
        .pipe(minify())
        .pipe(gulp.dest("./siteFiles"))
};
var buildJs = function () {
    return gulp.src(src.js)
        .pipe(concat("all.js"))
        // .pipe(uglify())
        .pipe(gulp.dest("./siteFiles"))
};
gulp.task("css", buildCss);
gulp.task("js", buildJs);
gulp.task("build", ["css", "js"]);

gulp.task("watchCss", function () {
    return watch(src.css, buildCss);
});
gulp.task("watchJs", function () {
    return watch(src.js, buildJs);
});
gulp.task("watch", ["watchCss", "watchJs"]);
