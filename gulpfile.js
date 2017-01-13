'use strict';

var gulp = require('gulp'),
    del = require('del'),
    plugins = require('gulp-load-plugins')();

// var path = {
//   src: {
//     jshint: ['public/scripts/js/**/*.js','app/**/*.js','*.js','route/**','test/**'],
//     scripts: 'public/scripts/js/**/*.js',
//     sass: 'public/sass/**/*.scss',
//     images: 'public/images/**',
//     clean: 'public/libs/**'
//   },
//   dest: {
//     scripts: 'public/libs/scripts/js/',
//     sass: 'public/libs/css/',
//     images: 'public/libs/images',
//   }
// };

// gulp.task('styles', function() {
//   return plugins.rubySass(path.src.sass)
//    .on('error', plugins.rubySass.logError)
//    .pipe(plugins.autoprefixer({            // 自动添加游览器前缀
//       browsers: ['last 2 versions'],
//       cascade: false
//     }))
//    .pipe(plugins.rename({suffix:'.min'}))
//    .pipe(plugins.minifyCss())
//    .pipe(gulp.dest(path.dest.sass));
// });

// gulp.task('jshint', function() {
//   return gulp.src(path.src.jshint)
//     .pipe(plugins.jshint('.jshintrc'))
//     .pipe(plugins.jshint.reporter('default'));
// });

// gulp.task('scripts', function() {
//   return gulp.src(path.src.scripts)
//     .pipe(plugins.rename({suffix: '.min'}))
//     .pipe(plugins.uglify())
//     .pipe(gulp.dest(path.dest.scripts));
// });

// gulp.task('images', function() {
//   return gulp.src(path.src.images)
//     .pipe(plugins.cache(plugins.imagemin({ progressive: true, interlaced: true })))
//     .pipe(gulp.dest(path.dest.images));
// });

// gulp.task('watch', function() {
//   gulp.watch(path.src.sass,['styles']);
//   gulp.watch(path.src.jshint,['jshint']);
//   gulp.watch(path.src.scripts,['scripts']);
//   gulp.watch(path.src.images,['images']);
// });

// gulp.task('clean', function(cb) {
//   del(path.src.clean, cb());
// });

// gulp.task('test', function() {
//   return gulp.src('test/**/*.js', {read: false})
//     .pipe(plugins.mocha({reporter: 'spec'}));
// });

gulp.task('nodemon',function() {
  plugins.nodemon({ script: 'app.js',
    ignore: ['README.md', 'node_modules/**', '.DS_Store']
  });
});

//gulp.task('default',['watch','nodemon']);
gulp.task('default',['nodemon']);