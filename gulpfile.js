var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    order = require('gulp-order'),
    filter = require('gulp-filter');

gulp.task('vendorsjs',function(){
  return gulp.src(mainBowerFiles({
  filter:'**/*.js',
    paths: {
        bowerDirectory: 'bower_components'
    }
}))
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest('clientApp/compiled/js'));
});

gulp.task('vendorscss',function(){
  return gulp.src(mainBowerFiles({
  filter:'**/*.css',
    paths: {
        bowerDirectory: 'bower_components'
    }
}))
  .pipe(concat('vendors.css'))
  .pipe(gulp.dest('clientApp/compiled/css'));
});

gulp.task('libraryjs',function(){
  return gulp.src('clientApp/libraryApp/**/*.js')
  .pipe(order([
    "**/libraryApp.module.js",
    "**/*.js"
  ]))
  .pipe(concat('libraryjs.js'))
  .pipe(gulp.dest('clientApp/compiled/js'));
});