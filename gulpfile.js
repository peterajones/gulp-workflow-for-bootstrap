/* GETTING STARTED */
/* If you are reading this file, you are probably wanting to get started developing
your Bootstrap project. In the command line, navigate to this project and type
'npm install' +  enter. 
You may need to prepend the 'npm' commands with sudo if you are on a Mac.
This will install the dependencies. The next step is to check for updates. */

/* CHECKING FOR UPDATES */
/* In the command line type 'npm-check-updates -u' to download any new dependencies
and upgrade the 'package.json' file automatically. Done */

/* BUILDING THE DEVELOMENT ENVIRONMENT AND VIEWING YOUR WORK */
/* If thae last proccess is still running, type ctrl + C. */
/* Run 'gulp devSetUp' and point your browser to 'http://localhost:8000'. 
The rext of the instructions will be displayed in the browser. */

/* ============================================================================ */

/* Define dependencies variables */

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	webserver = require('gulp-webserver'),
	pngcrush = require('imagemin-pngcrush');

/* Move the original Bootstrap distro to our dev environment (builds/development/) */
/* This allows us to preseve the original files in case we need them if we screw up */
/* Run 'gulp devSetUp' to perfom this task */

var paths = {
	js: ['js/bootstrap.js', 'slick/slick.js'],
	css: ['css/bootstrap.css', 'slick/slick.css'],
	images: ['img/**/*.*', 'slick/ajax-loader.gif'],
	fonts: ['fonts/*.*', 'slick/fonts/*.*'],
	html: ['*.html'],
	php: ['*.php'],
	txt: ['*.txt']
};

gulp.task('scriptsSetUp', function() {
	gulp.src(paths.js)
	.pipe(gulp.dest('builds/development/js/'))
	gutil.log('Successfully copied the scripts');
});

gulp.task('cssSetUp', function() {
	gulp.src(paths.css)
	.pipe(gulp.dest('builds/development/css/'))
	gutil.log('Successfully copied the css files');
});

gulp.task('imgSetUp', function() {
	gulp.src(paths.images)
	.pipe(gulp.dest('builds/development/img/'))
	gutil.log('Successfully copied the image files');
});

gulp.task('fontSetUp', function() {
	gulp.src(paths.fonts)
	.pipe(gulp.dest('builds/development/fonts/'))
	gutil.log('Successfully copied the font files');
});

gulp.task('htmlSetUp', function() {
	gulp.src(paths.html)
	.pipe(gulp.dest('builds/development/'))
	gutil.log('Successfully copied the html file(s)');
});

gulp.task('phpSetUp', function() {
	gulp.src(paths.php)
	.pipe(gulp.dest('builds/development/'))
	gutil.log('Successfully copied the php file(s)');
});

gulp.task('txtSetUp', function() {
	gulp.src(paths.txt)
	.pipe(gulp.dest('builds/development/'))
	gutil.log('Successfully copied the text file(s)');
});

/* Run all the development setup tasks and view your work in a browser */

gulp.task('devSetUp', ['scriptsSetUp', 'cssSetUp', 'imgSetUp', 'fontSetUp', 'htmlSetUp', 'phpSetUp', 'txtSetUp', 'connect'], function() {
	 gutil.log('Your Bootstrap development environment is now setup.');
	 gutil.log('Type "ctrl + C" to exit and then type "gulp dev" to start the dev server.');
});

/* SETTING UP THE DEVELOPMENT ENVIRONMENT */

var env,
	htmlSources,
	cssSources,
	jsSources,
	imgSources,
	fontSources,
	phpSources,
	txtSources,
	outputDir;

/* Define Environment and Sources */
env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	outputDir = 'builds/development/';
} else {
	outputDir = 'builds/production/';
}

htmlSources = [
	outputDir + '*.html',
	outputDir + '*.php'
	];
cssSources = [
	outputDir + 'css/bootstrap.css',
	outputDir + 'css/slick.css',
	outputDir + 'css/myCSS.css'
	];
jsSources = [
	outputDir + 'js/bootstrap.js',
	outputDir + 'js/slick.js',
	outputDir + 'js/myJS.js'
	];
imgSources = [
	outputDir + 'img/**/*.*'];
phpSources = [outputDir + '*.php'];
fontSources = [
	outputDir + 'fonts/**/*.*'];
txtSources = [outputDir + '*.txt'];

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task('css', function() {
	gulp.src(cssSources)
		.pipe(concat('app.css'))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('img', function() {
	gulp.src(imgSources)
		.pipe(gulp.dest(outputDir + 'img'))
		.pipe(connect.reload())
});

gulp.task('fonts', function() {
	gulp.src(fontSources)
	.pipe(gulp.dest(outputDir + 'fonts'))
});

gulp.task('php', function() {
	gulp.src(phpSources)
	.pipe(gulp.dest(outputDir))
	.pipe(connect.reload())
});

gulp.task('txt', function() {
	gulp.src(txtSources)
	.pipe(gulp.dest(outputDir))
	gutil.log('Successfully saved the text file(s)');
});

gulp.task('watch', function() {
	gulp.watch(htmlSources, ['html']);
	gulp.watch(cssSources, ['css']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(imgSources, ['img']);
	gulp.watch(phpSources, ['php']);
	gulp.watch(txtSources, ['txt']);
	gutil.log('You are working in /' + outputDir);
	gutil.log('Point your browser to "http://localhost:8000" for next step instructions.');

});

gulp.task('dev', ['html', 'css', 'js', 'php', 'txt', 'fonts', 'webserver', 'watch'], function() {

});

/* PRODUCTION */

/* Add and Minify all HTML files */
gulp.task('minifyHTML', function() {
	gulp.src('builds/development/*.html')
	.pipe(minifyHTML())
	.pipe(gulp.dest(outputDir))
	.pipe(connect.reload())
});

/* Add and Minify all PHP files */
gulp.task('minifyPHP', function() {
	gulp.src('builds/development/*.php')
	.pipe(minifyHTML())
	.pipe(gulp.dest(outputDir))
	.pipe(connect.reload())
});

/* Add and Uglify the app.js file */
gulp.task('uglifyJS', function() {
	gulp.src('builds/development/js/app.js')
	.pipe(uglify())
	.pipe(gulp.dest(outputDir + 'js'))
	.pipe(connect.reload())
});

/* Add and Uglify the app.css file */
gulp.task('minifyCSS', function() {
	gulp.src('builds/development/css/app.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest(outputDir + 'css'))
	.pipe(connect.reload())
});

/* Add and compress the image file(s) */
gulp.task('minifyIMG', function() {
	gulp.src('builds/development/img/**/*.*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{ removeViewBox: false }],
		use: [pngcrush()]
	}))
	.pipe(gulp.dest(outputDir + 'img'))
	.pipe(connect.reload())
});

/* Add the .txt file(s) */
gulp.task('moveTXT', function() {
	gulp.src('builds/development/*.txt')
	.pipe(gulp.dest(outputDir))
});

/* Add the font(s) */
gulp.task('moveFONTS', function() {
	gulp.src('builds/development/fonts/*.*')
	.pipe(gulp.dest(outputDir + 'fonts'))
});

gulp.task('prod', ['minifyHTML', 'minifyPHP', 'minifyIMG', 'moveTXT', 'moveFONTS', 'uglifyJS', 'minifyCSS', 'webserver'], function() {
	gutil.log('You are working in /' + outputDir)
});

gulp.task('connect', function() {
	connect.server({
		root: 'outputDir',
		livereload: true
	});
});

gulp.task('webserver', function(reload) {
  gulp.src(outputDir)
    .pipe(webserver({
      livereload: true
    }));
});
