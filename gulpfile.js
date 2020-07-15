var gulp = require("gulp");
var sass = require("gulp-sass");

var browserSync = require("browser-sync").create()



var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "src/scss/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "build"
    }

};

// Define tasks after requiring dependencies
function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src(paths.styles.src)

            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)

            // What is the destination for the compiled file?
            .pipe(gulp.dest(paths.styles.dest))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    );
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;


function watch() {
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, style)
}

// Don't forget to expose the task!
exports.watch = watch


// A simple task to reload the page
function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(paths.styles.src, style);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch("*.html", reload);
}

function reload(done) {
    browserSync.reload();
    done();
}

// We don't have to expose the reload function
// It's currently only useful in other functions