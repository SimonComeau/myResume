var gulp = require("gulp");
var minify = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var watch = require("gulp-watch");

var src = {
    css: ["bower_components/bootstrap/dist/css/bootstrap.css",
        "bower_components/angular-bootstrap/ui-bootstrap-csp.css",
        "bower_components/hover/css/hover.css",
        "bower_components/angular-material/angular-material.css",
        "app/contact/customContact.css"],
     js: ["bower_components/angular/angular.js",
        "bower_components/angular-ui-router/release/angular-ui-router.js",
        "bower_components/jquery/dist/jquery.js",
        "bower_components/bootstrap/dist/js/bootstrap.js",
        "bower_components/angular-bootstrap/ui-bootstrap.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-aria/angular-aria.js",
        "bower_components/angular-material/angular-material.js",
        "app/app.js",
        "app/home/menu.controller.js",
        "app/home/home.controller.js",
        "app/contact/contact.controller.js",
        "app/portfolio/portfolio.controller.js"]
};
var buildCss = function () {
    return gulp.src(src.css)
        .pipe(concat("all.css"))
        .pipe(minify())
        .pipe(gulp.dest("./"))
};
var buildJs = function () {
    return gulp.src(src.js)
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./"))
};
gulp.task ("css", buildCss);
gulp.task ("js", buildJs);
gulp.task ("build", ["css", "js"]);

gulp.task ("watchCss", function () {
    return watch(src.css, buildCss);
});
gulp.task ("watchJs", function () {
    return watch(src.js,buildJs);
});
gulp.task ("watch", ["watchCss", "watchJs"]);
