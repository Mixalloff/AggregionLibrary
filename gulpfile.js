var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    order = require('gulp-order'),
    filter = require('gulp-filter')
    exec = require('child_process').exec;

// Путь к собранным файлам
var buildPath = "clientApp/build";

// Компоненты bower
var vendorsJsFiles = mainBowerFiles({
  filter:'**/*.js',
    paths: {
        bowerDirectory: 'bower_components'
    }
});
var vendorsCssFiles = mainBowerFiles({
  filter:'**/*.css',
    paths: {
        bowerDirectory: 'bower_components'
    }
});

gulp.task('vendorsjs',function(){
  return gulp.src(vendorsJsFiles)
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('vendorscss',function(){
  return gulp.src(vendorsCssFiles)
  .pipe(concat('vendors.css'))
  .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('libraryjs',function(){
  return gulp.src('clientApp/libraryApp/**/*.js')
  .pipe(order([
    "**/libraryApp.module.js",
    "**/*.js"
  ]))
  .pipe(concat('libraryjs.js'))
  .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('server', function (cb) {
  exec('node server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('watch', function(){
  gulp.watch(vendorsJsFiles, ['vendorsjs']);
  gulp.watch(vendorsCssFiles, ['vendorscss']);
  gulp.watch('clientApp/libraryApp/**/*.js', ['libraryjs']);
});

// Выполняет сборку
gulp.task('build', ['vendorsjs', 'vendorscss', 'libraryjs']);

// Собирает проект, запускае сервер и отслеживает изменения
gulp.task('default', ['build', 'server', 'watch']);
// Альтернативный вызов для запуска сервера и автосборки
gulp.task('serve', ['default']);