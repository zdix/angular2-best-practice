var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var minifyHTML = require('gulp-minify-html');
var rename = require("gulp-rename");
var merge = require('merge-stream');
var phpjs = require('phpjs');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var ts = require('gulp-typescript');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var fs = require("fs");

function generateRandomString(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i = 0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// var version = generateRandomString(7) + '.' + (phpjs.date('YmdHis', phpjs.time()));
var version = (phpjs.date('YmdHis', phpjs.time()));
version = '';

gulp.task('concat-angular-lib', function(){
    var mergeTask = gulp.src([
            './node_modules/systemjs/dist/system.src.js',
            './node_modules/core-js/client/shim.js',
            './node_modules/zone.js/dist/zone.js',
            './node_modules/rxjs/bundles/Rx.js',
            './node_modules/reflect-metadata/Reflect.js',
        ])
        .pipe(concat('base.bundle.js', {newLine: '\r\n'}))
        .pipe(gulp.dest('build/vendor'));

    var pkgMapping = {
        './node_modules/rxjs/**/*': 'rxjs',
        './node_modules/@angular/common/bundles/common.umd.js': 'angular/common',
        './node_modules/@angular/compiler/bundles/compiler.umd.js': 'angular/compiler',
        './node_modules/@angular/core/bundles/core.umd.js': 'angular/core',
        './node_modules/@angular/forms/bundles/forms.umd.js': 'angular/forms',
        './node_modules/@angular/platform-browser/bundles/platform-browser.umd.js': 'angular/platform-browser',
        './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js': 'angular/platform-browser-dynamic',
        './node_modules/@angular/router/bundles/router.umd.js': 'angular/router',
        './node_modules/@angular/router-deprecated/bundles/router-deprecated.umd.js': 'angular/router-deprecated',
        './node_modules/@angular/upgrade/bundles/upgrade.umd.js': 'angular/upgrade',
    };
    var pkgTasks = [];
    for (var i in pkgMapping)
    {
        var dest = pkgMapping[i];
        var task = gulp.src(i).pipe(gulp.dest('build/vendor/module/' + dest));
        pkgTasks.push(task);
    }


    var mergeProdTask = gulp.src([
            './node_modules/systemjs/dist/system.js',
            './node_modules/core-js/client/shim.min.js',
            './node_modules/zone.js/dist/zone.min.js',
            './node_modules/rxjs/bundles/Rx.min.js',
            './node_modules/reflect-metadata/Reflect.js',
        ])
        .pipe(concat('base.bundle.min.js', {newLine: '\r\n'}))
        .pipe(gulp.dest('build/vendor'));

    var pkgMappingProd = {
        './node_modules/@angular/common/bundles/common.umd.min.js': 'angular/common',
        './node_modules/@angular/compiler/bundles/compiler.umd.min.js': 'angular/compiler',
        './node_modules/@angular/core/bundles/core.umd.min.js': 'angular/core',
        './node_modules/@angular/forms/bundles/forms.umd.min.js': 'angular/forms',
        './node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js': 'angular/platform-browser',
        './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js': 'angular/platform-browser-dynamic',
        './node_modules/@angular/router/bundles/router.umd.min.js': 'angular/router',
        './node_modules/@angular/router-deprecated/bundles/router-deprecated.umd.min.js': 'angular/router-deprecated',
        './node_modules/@angular/upgrade/bundles/upgrade.umd.min.js': 'angular/upgrade',
    };
    var pkgTasksProd = [];
    for (var i in pkgMappingProd)
    {
        var dest = pkgMappingProd[i];
        var task = gulp.src(i).pipe(gulp.dest('build/vendor/module/' + dest));
        pkgTasksProd.push(task);
    }

    return merge(mergeTask, pkgTasks, mergeProdTask, pkgTasksProd);
});


/**
 * begin build app js dir
 */

var app = ['reimbursement', 'hello'];

gulp.task('clean-old-js', function(){
    var tasks = [];

    for (var i in app)
    {
        var dir = app[i];
        var task = gulp.src('build/' + dir, {read: false})
            .pipe(clean());
        tasks.push(task);
    }

    return merge.apply(null, tasks);

    /*
    var reimbursement = gulp.src('build/reimbursement', {read: false})
        .pipe(clean());
    */
});

gulp.task('build-js', ['clean-old-js'], function(){
    var tasks = [];

    for (var i in app)
    {
        var dir = app[i];
        var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
        var task = gulp.src(['typings/index.d.ts', 'app/' + dir + '/**/*.ts'])
            .pipe(ts(tsProject))
            .pipe(gulp.dest('build/' + dir));
        tasks.push(task);
    }

    tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
    var taskBase = gulp.src(['typings/index.d.ts', 'app/*.ts'])
        .pipe(ts(tsProject))
        .pipe(gulp.dest('build/'));
    tasks.push(taskBase);

    return merge.apply(null, tasks);

    /*
    var reimbursement = gulp.src(['js/reimbursement/*.js'])
        .pipe(uglify())
        .pipe(rename({ extname: '.' + version + '.js' }))
        .pipe(gulp.dest('build/reimbursement'));
    */
});

gulp.task('build-init-js', ['build-js'], function(){
    var tasks = [];

    for (var i in app)
    {
        var dir = app[i];
        var task = gulp.src(['js/' + dir + '/init.js'])
            .pipe(replace('@js-extension', version + '.js' ))
            .pipe(uglify())
            .pipe(rename({ extname: '.' + version + '.js' }))
            .pipe(gulp.dest('build/' + dir));
        tasks.push(task);
    }

    return merge.apply(null, tasks);

    /*
    var reimbursement = gulp.src(['js/reimbursement/init.js'])
        .pipe(replace('@js-extension', version + '.js' ))
        .pipe(uglify())
        .pipe(rename({ extname: '.' + version + '.js' }))
        .pipe(gulp.dest('build/reimbursement'));
    */
});

gulp.task('copy-html', ['clean-old-js'], function(){
    var tasks = [];

    for (var i in app)
    {
        var dir = app[i];
        var task = gulp.src(['app/' + dir + '/**/*.html'])
            .pipe(gulp.dest('build/' + dir));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});


/**
 * build final page
 */

gulp.task('build-html', function() {

    var pages = [
        { name: 'hello', file: 'hello.html', title: '', desc: '', keywords: ''},
    ];
    var tasks = [];

    for (var i in pages)
    {
        var page = pages[i];
        var name = page.name;
        var title = page.title;
        var desc = page.desc;
        var keywords = page.keywords;
        var file = page.file;

        var task = gulp.src(['core/layout/angular.html'])
            .pipe(replace('@title', title))
            .pipe(replace('@desc', desc))
            .pipe(replace('@keywords', keywords))
            .pipe(replace('@base-url', file))
            .pipe(replace('@js-extension', version + '.js' ))
            .pipe(replace('@boot-module', name + '/boot' ))
            //.pipe(minifyHTML())
            .pipe(rename(file))
            .pipe(gulp.dest('build/'));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});

gulp.task('default', ['concat-angular-lib', 'clean-old-js', 'build-js', 'build-init-js', 'build-html', 'copy-html']);


gulp.task('sync', function() {
    browserSync.init({
        server: "./build"
    });

    gulp.watch("app/**/*.js", ['default']);
    gulp.watch("app/**/*.scss", ['default']);
    gulp.watch("app/**/*.html", ['default']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});