/*Created By Jsir on 2018/9/13*/
'use strict'
const gulp = require('gulp')
const sass = require('gulp-sass')
const cssmin = require('gulp-clean-css')
const rename = require('gulp-rename')
const minify = require('gulp-minify')
const htmlmin = require('gulp-htmlmin')
const imageMin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cache = require('gulp-cache');
gulp.task('css', () => {
    return gulp.src(['../src/**/*.css'])
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('../dist/'));
});
gulp.task('compile-css', () => {
    return gulp.src(['../src/**/*.scss', '!../src/**/_*.scss'])
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('../dist/'));
});
gulp.task('compile-js', () => {
    return gulp.src(['../src/**/*.js'])
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('../dist/'))
});
gulp.task('compile-json', () => {
    return gulp.src(['../src/**/*.json'])
        .pipe(gulp.dest('../dist/'));
});
gulp.task('compile-wxs', () => {
    return gulp.src(['../src/**/*.wxs'])
        .pipe(rename((path) => {
            path.extname = '.js';
        }))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.js'
            },
            noSource: true
        }))
        .pipe(rename((path) => {
            path.extname = '.wxs';
        }))
        .pipe(gulp.dest('../dist/'));
});
gulp.task('compile-wxml', () => {
    return gulp.src(['../src/**/*.wxml'])
    // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../dist/'));
});
gulp.task('compile-image', function () {
    gulp.src('../src/static/images/*.*')
        .pipe(cache(imageMin({progressive: true, use: [pngquant()]})))
        .pipe(gulp.dest('../dist/static/images/'))
})
gulp.task('auto', () => {
    gulp.watch('../src/**/*.scss', ['compile-css']);
    gulp.watch('../src/**/*.js', ['compile-js']);
    gulp.watch('../src/**/*.json', ['compile-json']);
    gulp.watch('../src/**/*.wxml', ['compile-wxml']);
    gulp.watch('../src/**/*.wxs', ['compile-wxs']);
    gulp.watch('../src/**/*.css', ['css']);
});
gulp.task('default', ['compile-css', 'compile-js', 'compile-json', 'compile-wxml', 'compile-wxs', 'compile-image', 'css','auto']);
