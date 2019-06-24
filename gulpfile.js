const path = require('path')
const gulp = require('gulp')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const markdown = require('./bundlers/gulp-plugins/markdown')

function markdownTask () {
  return gulp.src('resources/posts/**/*.markdown')
    .pipe(markdown({
      nunjucks: {
        base: path.resolve(__dirname, 'resources'),
        layout: 'layout/post.njk',
      }
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('webroot/posts'))
}

function postcssTask () {
  return gulp.src('resources/scss/pages/**/*.scss')
    .pipe(postcss())
    .pipe(rename(p => p.extname = '.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('webroot/stylesheets'))
}

const build = gulp.series(gulp.parallel(postcssTask, markdownTask))

exports.default = build

function watchTask () {

  gulp.watch(['resources/posts/**/*.markdown', 'resources/scss/pages/**/*.scss', 'resources/layout/**/*.njk'], build)

}

exports.watch = watchTask

