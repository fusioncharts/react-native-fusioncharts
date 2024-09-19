const rename = require('gulp-rename');
const gulp = require('gulp');
const removeFiles = require('gulp-remove-files');
const fs = require('fs').promises;
const merge = require('merge-stream');
const { modules, scripts } = require('./src/FusionChartsModule.js');
const { replacePathsWithContents } = require('./gulpUtil.js');

const filePath = './src/modules/fusioncharts/';
const inputFilePath = './src/modules/index.html';
const outputFilePath = './src/modules/layout.js';
const jsOutputFilePath = './src/modules/scripts.js';
const modulesOutputFilePath = './src/modules/modules.js';

// Task for renaming and removing files
gulp.task('rename', function () {

    const renameModuleStream = gulp.src(filePath + '*.js')
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

    return renameModuleStream
});

// Default task
gulp.task('default', gulp.series('rename', async function (done) {
    try {
        // Read the content of index.html
        const data = await fs.readFile(inputFilePath, 'utf8');

        // Escape backticks and dollar signs to prevent issues in the template string
        const escapedContent = data.replace(/`/g, '\\`').replace(/\$/g, '\\$');

        // Prepare the JavaScript content
        const outputContent = `export default \`${escapedContent}\`;`;

        // Write the content to layout.js
        await fs.writeFile(outputFilePath, outputContent);
        console.log('layout.js created successfully!');

        // Read Scripts and Modules and create a single output.js file
        await replacePathsWithContents(scripts);
        const jsOutputContent = `export default ${JSON.stringify(scripts)};`;
        await fs.writeFile(jsOutputFilePath, jsOutputContent);
        console.log('scripts.js created successfully!');

        // Process modules
        await replacePathsWithContents(modules);
        const modulesOutputContent = `export default ${JSON.stringify(modules)};`;
        await fs.writeFile(modulesOutputFilePath, modulesOutputContent);
        console.log('modules.js created successfully!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        done(); // Ensure done is called even if an error occurs
    }
}));
