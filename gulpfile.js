'use strict';

var gulp = require('gulp');
var include  = require('gulp-include');
var concat  = require('gulp-concat');
var browserSync  = require('browser-sync');
var ngHtml2Js = require("gulp-ng-html2js");


/**
 * scripts
 */
gulp.task('scripts', ['templates'], function() {
    return gulp.src(['app/app.js', 'dist/templates.js'])
        .pipe(concat('app.js'))
        .pipe(include())
        .pipe(gulp.dest('app/built'));
});

/**
 * watch
 */
gulp.task('watch', ['scripts'] ,function () {
    gulp.watch(['app/app.js', 'src/**/*', 'templates/**/*'], ['scripts']);
});

/**
 * serve
 */
gulp.task('serve', ['watch'], function () {
    var options = {
        server: {
            baseDir: 'app'
        },
        files: "app/built/*.js"
    };
    browserSync(options);
});


/**
 * templates
 */
gulp.task('templates', function () {
    return gulp.src('templates/**/*.html')
        .pipe(ngHtml2Js({
            moduleName: "angular.dialog",
            prefix: "templates/"
        }))
        .pipe(concat("templates.js"))
        .pipe(gulp.dest("./dist"));
});


/**
 * build
 */
gulp.task('build', ['templates'], function () {
    return gulp.src(['src/dialog.js', 'src/*/**/*.js', 'dist/templates.js'])
        .pipe(concat('dialog.js'))
        .pipe(gulp.dest('dist'));
});
