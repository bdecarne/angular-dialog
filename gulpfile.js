'use strict';

var gulp = require('gulp');
var include  = require('gulp-include');
var concat  = require('gulp-concat');
var plumber  = require('gulp-plumber');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var cssmin  = require('gulp-cssmin');
var minifyHtml = require('gulp-minify-html');
var sass  = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer')
var browserSync  = require('browser-sync');
var ngHtml2Js = require("gulp-ng-html2js");
var es = require('event-stream');


/**
 * build : scripts
 */
gulp.task('build:scripts', [], function() {
    return es.merge(gulp.src(['src/dialog.js', 'src/*/**/*.js']), templates())
        .pipe(plumber())
        .pipe(concat('angular-dialog.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('angular-dialog.min.js'))
        .pipe(gulp.dest('./dist'));
});

function templates() {
    return gulp.src(['templates/**/*.html'])
        .pipe(plumber())
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: "angular.dialog",
            prefix: "templates/",
            declareModule: false
        }))
        .pipe(concat('angular-dialog.tpls.js'));
}

/**
 * build : styles
 */
gulp.task('build:styles', [], function() {
    return gulp.src('scss/dialog.scss')
        .pipe(plumber())
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 1 version, ie 9, ie 10, ie 11'))
        .pipe(rename('angular-dialog.css'))
        .pipe(gulp.dest('./dist/'))
        .pipe(cssmin())
        .pipe(rename('angular-dialog.min.css'))
        .pipe(gulp.dest('./dist'));
});

/**
 * build
 */
gulp.task('build', ['build:scripts', 'build:styles']);

/**
 * default
 */
gulp.task('default', ['build']);


//
///**
// * scripts
// */
//gulp.task('scripts', ['templates'], function() {
//    return gulp.src(['app/app.js', 'dist/templates.js'])
//        .pipe(concat('app.js'))
//        .pipe(include())
//        .pipe(gulp.dest('app/built'));
//});
//
///**
// * scripts
// */
//gulp.task('styles', function () {
//    return gulp.src('scss/*.scss')
//        .pipe(plumber())
//        .pipe(sass({style: 'expanded'}))
//        .pipe(autoprefixer('last 1 version, ie 9, ie 10, ie 11'))
//        .pipe(gulp.dest('dist'))
//        .pipe(size());
//});
//
///**
// * watch
// */
//gulp.task('watch', ['scripts', 'styles'] ,function () {
//    gulp.watch(['app/app.js', 'src/**/*', 'templates/**/*'], ['scripts']);
//    gulp.watch(['scss/**/*'], ['styles']);
//});
//
///**
// * serve
// */
//gulp.task('serve', ['watch'], function () {
//    var options = {
//        server: {
//            baseDir: 'app'
//        },
//        files: "app/built/*.js"
//    };
//    browserSync(options);
//});
//
//
///**
// * templates
// */
//gulp.task('templates', function () {
//    return gulp.src('templates/**/*.html')
//        .pipe(ngHtml2Js({
//            moduleName: "angular.dialog",
//            prefix: "templates/"
//        }))
//        .pipe(concat("templates.js"))
//        .pipe(gulp.dest("./dist"));
//});
//
//
///**
// * build
// */
//gulp.task('build', ['templates'], function () {
//    return gulp.src(['src/dialog.js', 'src/*/**/*.js', 'dist/templates.js'])
//        .pipe(concat('dialog.js'))
//        .pipe(gulp.dest('dist'));
//});
