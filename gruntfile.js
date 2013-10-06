
module.exports = function(grunt) {

  var target = grunt.option('target') || 'debug';

  grunt.log.writeln('Target set to: "' + target + '". Specify with --target=(debug/release).');

  require('./grunt/grunt-' + target)(grunt);
};