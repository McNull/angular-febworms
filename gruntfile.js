
module.exports = function(grunt) {

  var target = grunt.option('target') || 'debug';

  grunt.log.writeln('Target set to: "' + target + '". Specify with --target=(debug/release).');

  var projectFiles = require('./grunt/project-files-' + target);
  var gruntCommon = require('./grunt/grunt-common');
  var gruntTarget = require('./grunt/grunt-' + target);

  var commonConfig = gruntCommon(grunt, projectFiles);

  gruntTarget(grunt, commonConfig);
};