/// <binding AfterBuild='build' Clean='clean-lib' />
var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    fs = require("fs"),
    del = require('del'),
    path = require('path');

var outputRoot = './wwwroot/';
var outputLib = outputRoot + "libs/";
var outputApp = outputRoot + "app/";
var sourceRoot = './Client/app/';

var paths = {
    npm: './node_modules/',
    bower: './bower_components/',

    tsSource: sourceRoot + 'scripts/**/*.ts',
    tsOutput: outputApp + 'js/',
    tsDef: outputLib + 'definitions/',

    cssApp: outputApp + 'css/',
    viewsApp: outputApp + 'views/',

    jsVendors: outputLib + 'js',
    jsRxJSVendors: outputLib + 'js/rxjs',
    cssVendors: outputLib + 'css',
    imgVendors: outputLib + 'img',
    fontsVendors: outputLib + 'fonts'
};

var tsProject = ts.createProject('Client/app/scripts/tsconfig.json');

gulp.task('setup-vendors', function (done) {
    gulp.src([
        'fancybox/dist/js/jquery.fancybox.pack.js',
        'core-js/client/**',
        'systemjs/dist/system.src.js',
        'reflect-metadata/*.js',
        'rxjs/**/*.js',
        'zone.js/dist/*.js',
        '@angular/**/*.js',
        '@ng-bootstrap/ng-bootstrap/**/*.js',
        'angular2-in-memory-web-api/**/*.js',
        'jquery/dist/jquery*.js',
        'bootstrap/dist/js/bootstrap*.js',
        'tether/dist/js/tether*.js'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest(paths.jsVendors));

    gulp.src([
        'alertify.js/lib/alertify.min.js'
    ], {
        cwd: "bower_components/**"
    })
        .pipe(gulp.dest(paths.jsVendors));

    gulp.src([
      'Client/index.html'
    ]).pipe(gulp.dest(outputRoot));

    gulp.src([
      'Client/systemjs.config.js'
    ]).pipe(gulp.dest(paths.tsOutput));

    gulp.src([
      paths.npm + 'tether/dist/css/tether*.css',
      paths.npm + 'bootstrap/dist/css/bootstrap.css',
      paths.npm + 'fancybox/dist/css/jquery.fancybox.css',
      paths.bower + 'font-awesome/css/font-awesome.css',
      paths.bower + 'alertify.js/themes/alertify.core.css',
      paths.bower + 'alertify.js/themes/alertify.bootstrap.css',
      paths.bower + 'alertify.js/themes/alertify.default.css'
    ]).pipe(gulp.dest(paths.cssVendors));

    gulp.src([
      paths.npm + 'fancybox/dist/img/blank.gif',
      paths.npm + 'fancybox/dist/img/fancybox_loading.gif',
      paths.npm + 'fancybox/dist/img/fancybox_loading@2x.gif',
      paths.npm + 'fancybox/dist/img/fancybox_overlay.png',
      paths.npm + 'fancybox/dist/img/fancybox_sprite.png',
      paths.npm + 'fancybox/dist/img/fancybox_sprite@2x.png'
    ]).pipe(gulp.dest(paths.imgVendors));

    gulp.src([
      paths.bower + 'bootstrap/fonts/glyphicons-halflings-regular.eot',
      paths.bower + 'bootstrap/fonts/glyphicons-halflings-regular.svg',
      paths.bower + 'bootstrap/fonts/glyphicons-halflings-regular.ttf',
      paths.bower + 'bootstrap/fonts/glyphicons-halflings-regular.woff',
      paths.bower + 'bootstrap/fonts/glyphicons-halflings-regular.woff2',
      paths.bower + 'font-awesome/fonts/FontAwesome.otf',
      paths.bower + 'font-awesome/fonts/fontawesome-webfont.eot',
      paths.bower + 'font-awesome/fonts/fontawesome-webfont.svg',
      paths.bower + 'font-awesome/fonts/fontawesome-webfont.ttf',
      paths.bower + 'font-awesome/fonts/fontawesome-webfont.woff',
      paths.bower + 'font-awesome/fonts/fontawesome-webfont.woff2',
    ]).pipe(gulp.dest(paths.fontsVendors));
});

gulp.task('before-compile-view', function () {
    gulp.src([
        sourceRoot + 'views/**/*.html'
    ]).pipe(gulp.dest(paths.viewsApp));
});

gulp.task('before-compile-css', function () {
    gulp.src([
        sourceRoot + 'css/**/*.css'
    ]).pipe(gulp.dest(paths.cssApp));
});

gulp.task('compile-typescript', function (done) {
    var tsResult = gulp.src([
       "Client/app/scripts/**/*.ts"
    ])
     .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest(paths.tsOutput));
});

gulp.task('watch.views', ['before-compile-view'], function () {
    return gulp.watch(sourceRoot + 'views/*.html', ['before-compile-view']);
});

gulp.task('watch.css', ['before-compile-css'], function () {
    return gulp.watch(sourceRoot + 'css/*.css', ['before-compile-css']);
});

gulp.task('watch.ts', ['compile-typescript'], function () {
    return gulp.watch(sourceRoot + 'scripts/*.ts', ['compile-typescript']);
});

gulp.task('watch', ['watch.ts', 'watch.views', 'watch.css']);

gulp.task('clean-lib', function () {
    return del([outputLib]);
});

gulp.task('build', ['setup-vendors', 'before-compile-view', 'before-compile-css', 'compile-typescript']);
