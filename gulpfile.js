var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlreplace = require('gulp-html-replace'),
    timestamp = Date.now();

gulp.task('stylus', function () {
    return gulp.src('src/stylus/main.styl')
        .pipe(stylus())
        .pipe(autoprefixer(['last 15 version', '> 1%', 'ie 8'], {cascade: true}))
        .pipe(gulp.dest('src/css')) //destination
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('clearUserCache', function() {
    return gulp.src(['src/index.html', 'src/service.html'])
        .pipe(htmlreplace({
                clearCache: {
                    src: [[timestamp, timestamp, timestamp]],
                    tpl: '<link rel="stylesheet" href="css/main.min.css?%s">\n' +
                         '<script src="js/min.js?%s"></script>\n' +
                         '<script src="js/main.js?%s"></script>'}}
            )
        )
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js'
    ])
        .pipe(concat('min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
});

gulp.task('css-libs', ['stylus'], function () {
    return gulp.src('src/css/main.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    })
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
    gulp.watch('src/stylus/*.styl', ['stylus']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'clearUserCache', 'stylus', 'scripts'], function () {
    var buildCss = gulp.src('src/css/*')
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildVideo = gulp.src('src/video/**/*')
        .pipe(gulp.dest('dist/video'));

    var buildImages = gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});