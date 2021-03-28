const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
	return gulp.src('./scss/**/*.scss')	
	.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))		
		.pipe(autoprefixer(['last 2 versions']))
		.pipe(cleanCSS({
        level: 2
      }))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.reload( {stream: true} ))
});

function watch() {
    browserSync.init({
       server: {
           baseDir: "./"
       }
   });
   
   gulp.watch('./scss/**/*.scss', gulp.series('styles'))
   gulp.watch("./*.html").on('change', browserSync.reload);
 }
 gulp.task('default', watch);