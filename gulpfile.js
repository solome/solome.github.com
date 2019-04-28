const path = require('path')
const gulp = require('gulp')

function markdown () {
  return gulp.src(path.resolve(__dirname, 'resources/blog'))
    .pipe(gulp.dest(path.resolve(__dirname, 'web/blog')))
}

const build = gulp.series(gulp.parallel(markdown))

exports.default = build
