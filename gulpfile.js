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
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var glob = require('glob');
var sass = require('gulp-sass');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var fs = require("fs");

// var version = generateRandomString(7) + '.' + (phpjs.date('YmdHis', phpjs.time()));
var version = (phpjs.date('YmdHis', phpjs.time()));
version = '';

gulp.task('concat-angular-lib', function(){
    var mergeBaseModuleTask = gulp.src([
            'node_modules/es6-shim/es6-shim.js',
            'node_modules/es6-shim/es6-shim.map',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/reflect-metadata/Reflect.js.map'

        ])
        // .pipe(concat('base.bundle.js', {newLine: '\r\n'}))
        .pipe(gulp.dest('build/lib'));

    var mergeBaseModuleProdTask = gulp.src([
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/es6-shim/es6-shim.map',
            'node_modules/zone.js/dist/zone.min.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/reflect-metadata/Reflect.js.map'
        ])
        // .pipe(concat('base.bundle.min.js', {newLine: '\r\n'}))
        .pipe(gulp.dest('build/lib'));

    return merge(mergeBaseModuleTask, mergeBaseModuleProdTask);
});

var app = ['hello', 'ionic'];

gulp.task('clean', function(){
    var tasks = [];

    for (var i in app)
    {
        var dir = app[i];
        var task = gulp.src('build/' + dir, {read: false})
            .pipe(clean());
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});

gulp.task('build-sass', ['clean'], function () {
    var tasks = [];

    for (var i in app)
    {
        var dir = app[i];
        var task = gulp.src(['app/'+ dir +'/**/*.scss'])
            .pipe(sass({
                includePaths: [
                    'node_modules/ionic-angular',
                    'node_modules/ionicons/dist/scss'
                ]
            }).on('error', sass.logError))
            .pipe(concat('bundle'))
            .pipe(rename({ extname: '.css' }))
            .pipe(gulp.dest('build/' + dir));
        tasks.push(task);

        var taskProd = gulp.src(['app/'+ dir +'/**/*.scss'])
            .pipe(sass({
                includePaths: [
                    'node_modules/ionic-angular',
                    'node_modules/ionicons/dist/scss'
                ],
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(concat('bundle'))
            .pipe(rename({ extname: '.min.css' }))
            .pipe(gulp.dest('build/' + dir));
        tasks.push(taskProd);
    }

    return merge.apply(null, tasks);
});

gulp.task('build-js', ['clean'], function(){
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
});


gulp.task("ts", ['clean'], function () {
    var tasks = [];

    // var baseFiles = glob.sync('app/*.ts');
    for (var i in app)
    {
        var dir = app[i];
        // var files = glob.sync('app/' + dir + '/**/*.ts');
        var task = browserify({
            basedir: '.',
            debug: true,
            entries: ['app/' + dir + '/boot.ts'],
            extensions: ['.ts'],
            cache: {},
            packageCache: {}
        })
            .plugin(tsify)
            .bundle()
            .pipe(source('app.bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest("build/" + dir));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});

gulp.task('copy-html', ['clean'], function(){
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

gulp.task('copy-font', ['clean'], function(){
    return gulp.src(['node_modules/ionic-angular/fonts/**/*.+(ttf|woff|woff2)'])
        .pipe(gulp.dest('build/fonts'));
});


/**
 * build final page
 */

gulp.task('build-html', ['clean'], function() {

    var pages = [
        { name: 'hello', file: 'hello.html', title: '', desc: '', keywords: ''},
        { name: 'ionic', file: 'ionic.html', layout: 'ionic.html', title: '', desc: '', keywords: ''},
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
        var layout = page.layout ? page.layout : 'angular.html';

        var task = gulp.src(['core/layout/' + layout])
            .pipe(replace('@title', title))
            .pipe(replace('@desc', desc))
            .pipe(replace('@keywords', keywords))
            .pipe(replace('@base-url', file))
            .pipe(replace('@css-bundle', name + '/bundle.css'))
            .pipe(replace('@app-js-bundle', name + '/app.bundle.js'))
            //.pipe(minifyHTML())
            .pipe(rename(file))
            .pipe(gulp.dest('build/'));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});

gulp.task('default', ['concat-angular-lib', 'clean', 'build-sass', 'build-html', 'copy-html', 'copy-font', 'ts']);

gulp.task('sync', function() {
    browserSync.init({
        server: "./build"
    });

    gulp.watch("app/**/*.ts", ['default']);
    gulp.watch("app/**/*.scss", ['default']);
    gulp.watch("app/**/*.html", ['default']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});