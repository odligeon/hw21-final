var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function (done) {
    gulp.src("sass/*.scss")
        .pipe(sass().on('error', function (e) {
            console.log(e);
        }))
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());

    done();
});

gulp.task('serve', function (done) {

    browserSync.init({
        server: ""
    });

    gulp.watch("sass/*.scss", gulp.series('sass'));
    gulp.watch("*.html").on('change', () => {
        browserSync.reload();
        done();
    });


    done();
});
gulp.task('default', gulp.series('sass', 'serve'));