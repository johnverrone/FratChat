var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

var path = {
    HTML: 'src/index.html',
    ALL: ['src/components/*.js', 'src/index/html'],
    JS: ['src/components/*.js'],
    SCRIPTS_DIR: 'src/components',
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'dist/build',
    DEST: 'dist'
};

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        ttle: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end');
}

function buildScript(file, watch) {
    var props = {entries: [path.SCRIPTS_DIR + '/' + file]};
    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    bundler.transform(reactify);
    function rebundle() {
        var stream = bundler.bundle();
        return stream.on('error', handleErrors)
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(path.DEST + '/'));
    }
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });
    return rebundle();
}

gulp.task('build', function() {
    return buildScript('App.js', true);
});

gulp.task('copy', function() {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('start', function() {
    nodemon({
      script: 'server.js',
      ext: 'js html',
      env: {'NODE_ENV': 'development'}
    });
});

gulp.task('default', ['start', 'build', 'copy']);