#!/usr/bin/env node

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

var config = require('./build-config.js');

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

var gulp = require('gulp');
var path = require('path');
var karma = require('gulp-karma');

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

require('./gulp-tasks/bower-task.js')(gulp);
require('./gulp-tasks/index-task.js')(gulp);
require('./gulp-tasks/modules-task.js')(gulp);

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('test-run', ['angular-febworms'], function () {

  return gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    path.join(config.folders.dest, 'angular-febworms/angular-febworms.min.js'),
    path.join(config.folders.src, 'angular-febworms/**/*.test.js')
  ])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    })).on('error', function (err) {
      throw err;
    });

});

gulp.task('test-watch', ['angular-febworms'], function () {

  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/lodash/dist/lodash.compat.js',
    path.join(config.folders.src, 'angular-febworms/angular-febworms.js'),
    path.join(config.folders.dest, 'angular-febworms/angular-febworms-templates.js'),
    path.join(config.folders.src, 'angular-febworms/**/*.js')
  ])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));

});

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('build', [ 'modules', 'bower', 'index' ]);
gulp.task('default', [ 'build' ]);

// - - - - 8-< - - - - - - - - - - - - - - - - - - -