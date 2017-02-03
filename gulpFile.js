var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minify = require("gulp-minify-css");
var concat = require("gulp-concat");
var watch = require("gulp-watch");
var filter = require("gulp-filter");
var bowerFiles = require("gulp-main-bower-files");
var include = require("gulp-include");
var webpack = require("webpack-stream");
var src = {
    css: ["bower_components/**/*.css", "app/**/*.css"],
    js: ["app/**/*.js", "bower_components/**/*.js"],
    bower: ["bower.json"]
};
var publishedDir = "/";

gulp.task ("bower", function(){
   var jsFilter = filter ("**/*.js", {restore: true});
   var cssFilter = filter ("**/*.css", {restore: true});
   return bowerFiles()
       .pipe(jsFilter)
       .pipe(gulp.dest("/"))
       .pipe(jsFilter.restore)
       .pipe(cssFilter)
       .pipe(gulp.dest("/"))
       .pipe(cssFilter.restore)
});
function buildJs () {
    return gulp.src(src.js)
        .pipe(include())
        .pipe(gulp.dest("/"))
}
function buildCss (){
    return gulp.src(src.css)
        .pipe(gulp.dest("/"))
}
gulp.task ("css", buildCss);
gulp.task ("js", buildJs);
gulp.task ("watch", function () {
   gulp.watch(src.bower, ["bower"]);
    watch({ glob: src.css, name: "app.css"}, buildCss);
    watch({glob: src.js, name: "app.js"}, buildJs);
});
gulp.task ("compress-css", ["css"], function () {
    return gulp.src("/")
        .pipe(minify())
        .pipe(gulp.dest("/"))
});
gulp.task ("compress-js", ["js"], function () {
    return gulp.src("/")
        .pipe(uglify())
        .pipe(gulp.dest("/"))
});
gulp.task ("compress", ["compress-css", "compress-js"]);
gulp.task ("default", ["bower", "css", "js"]);
gulp.task ("build", ["bower", "compress"]);