const rename = require('gulp-rename');
const gulp = require('gulp');
const removeFiles = require('gulp-remove-files');

const filePath = './src/modules/fusioncharts/';

gulp.task('default', async function () {
    // rename
    gulp.src(filePath + '*.js')
        .pipe(rename(function (path) {
            path.extname = '.fcscript';
        }))
        .pipe(gulp.dest(filePath));
    
    // remove duplicates
    gulp.src(filePath + '*.js')
        .pipe(removeFiles());

    // rename modules in maps folder
    gulp.src(filePath + 'maps/es/*.js')
        .pipe(rename(function (path) {
            path.extname = '.fcscript';
        }))
        .pipe(gulp.dest(filePath + 'maps/es/'));
    
    // remove duplicates in maps folder
    gulp.src(filePath + 'maps/es/*.js')
        .pipe(removeFiles());

    // rename modules in themes folder
    gulp.src(filePath + 'themes/*.js')
        .pipe(rename(function (path) {
            path.extname = '.fcscript';
        }))
        .pipe(gulp.dest(filePath + 'themes/'));
    
    // remove duplicates in theme folder
    gulp.src(filePath + 'themes/*.js')
        .pipe(removeFiles());

});
