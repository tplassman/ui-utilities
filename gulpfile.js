const gulp = require('gulp'),
    babel = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    eslint = require('gulp-eslint'),
    envify = require('envify'),
    livereload = require('gulp-livereload'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

const config = {
    entry: './src/index.js',
    src: './src/**/*.js',
    dist: './dist/',
};

/**
 * Lint scripts using .eslintrc
 */
function lintJs() {
    return gulp
        .src([ config.src ])
        .on('error', err => { console.error(err); })
        .pipe(eslint())
        .pipe(eslint.format());
}
gulp.task('scripts:lint', lintJs);

/**
 * Transpile and bundle and minify
 */
gulp.task('build', () => {
    const bundler = browserify(config.entry).transform(babel).transform(envify);

    return bundler.bundle()
        .on('error', err => { console.error(err); })
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.dist));
});

/**
 * Watch for changes
 */
gulp.task('watch', () => {
    livereload.listen();

    const bundler = watchify(browserify(config.entry, { debug: true }).transform(babel).transform(envify));

    bundler.on('update', rebundle);

    function rebundle() {
        lintJs();

        return bundler.bundle()
            .on('error', err => { console.error(err); })
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(gulp.dest(config.dist))
            .pipe(livereload());
    }

    return rebundle();
});
