var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	prefix 			= require('gulp-autoprefixer'),
	pug 			= require('gulp-pug'),
	htmlbeautify 	= require('gulp-html-beautify'),
	data 			= require('gulp-data'),
	rename 			= require('gulp-rename'),
	uglify 			= require('gulp-uglify'),
	csscomb 		= require('gulp-csscomb'),
	browsersync 	= require('browser-sync');

gulp.task('styles',function(){
	gulp.src('app/sass/main.sass')
	.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
	.pipe(csscomb())
	.pipe(prefix())		
	.pipe(gulp.dest('app/css/'))
	.pipe(browsersync.reload({stream: true}));
});

gulp.task('views',function(){
	gulp.src('app/templates/*.pug')
	.pipe(data(function(file){
		return require('./app/templates/data/data.json')
	}))
	.pipe(pug())
	.pipe(htmlbeautify({"indent_size": 4,"indent_with_tabs": true}))
	.pipe(gulp.dest('app/'))
	.pipe(browsersync.reload({stream: true}));
});

gulp.task('scripts',function(){
	gulp.src(['app/js/*.js','!app/js/*min.js'])
	.pipe(uglify())
	.pipe(rename({
		suffix: ".min"
	}))
	.pipe(gulp.dest('app/js'))
	.pipe(browsersync.reload({stream: true}));
});

gulp.task('watch', function(){
	gulp.watch("app/sass/**/*.sass", ['styles']);
	gulp.watch("app/templates/**/*.pug",['views'])
});

gulp.task('browser-sync',function(){
	browsersync({
    server: {
      baseDir: "app/"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('default', ['browser-sync','watch','views','styles','scripts']);