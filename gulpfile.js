var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
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
