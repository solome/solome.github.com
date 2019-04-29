const path = require('path')
const gulp = require('gulp')
const markdown = require('./bundlers/gulp-plugins/markdown')

function markdownTask () {
  return gulp.src('resources/posts/**/*.markdown')
    .pipe(markdown({
      nunjucks: {
        base: path.resolve(__dirname, 'resources'),
        layout: 'layout/post.njk',
      }
    }))
    .pipe(gulp.dest('webroot/posts'))
}

const build = gulp.series(gulp.parallel(markdownTask))

exports.default = build
