let gulp = require("gulp");
let sass = require("gulp-sass");
let csso = require("gulp-csso");
let rename = require("gulp-rename");

gulp.task("default", function () {
  return gulp
    .src("scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(csso())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("dist"));
});

gulp.task("prod", function () {
  return gulp
    .src("scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(csso())
    .pipe(gulp.dest("dist"));
});
