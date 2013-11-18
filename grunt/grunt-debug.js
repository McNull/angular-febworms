var _ = require('lodash');

module.exports = function(grunt, commonConfig) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');

  var gruntConfig = {
    clean: {
      package: ['package/febworms.js', 'package/febworms.css']
    },
    concat: {
      febwormsJs: commonConfig.concat.buildTask(commonConfig.files['febworms'].js, 'src', 'febworms.js', ['<%= html2js.febworms.dest %>']),
      febwormsCss: commonConfig.concat.buildTask(commonConfig.files['febworms'].css, 'src', 'febworms.css')
    },
    html2js: {
      app: {
        src: ['src/app/**/*.tmpl.html'],
        dest: 'dist/app/templates-app.js'
      },
      febworms: {
        src: ['src/febworms/**/*.tmpl.html'],
        dest: 'dist/febworms/templates-febworms.js'
      }
    },
    copy: {
      febworms: {
        files: [{
          expand: true,
          cwd: 'src',
          src: [
            '<%= files.febworms.js %>',
            '<%= files.febworms.css %>',
            '<%= files.febworms.other %>',
            '!<%= files.febworms.test %>'
          ],
          dest: 'dist/'
        }]
      },
      app: {
        files: [{
          expand: true,
          cwd: 'src',
          src: [
            '<%= files.app.js %>',
            '<%= files.app.css %>',
            '<%= files.app.other %>',
            '!<%= files.app.test %>'
          ],
          dest: 'dist/'
        }]
      },
      vendor: {
        src: [
          '<%= files.vendor.js %>',
          '<%= files.vendor.css %>',
          '<%= files.vendor.other %>'
        ],
        dest: 'dist/'
      }
    }
  };

  gruntConfig = _.merge({}, commonConfig, gruntConfig);

  grunt.config.init(gruntConfig);

  grunt.registerTask('vendor', ['clean:vendor', 'copy:vendor']);
  grunt.registerTask('app', ['clean:app', 'html2js:app', 'copy:app']);
  grunt.registerTask('febworms', ['clean:febworms', 'html2js:febworms', 'copy:febworms']);

  grunt.registerTask('package', ['clean:package', 'build', 'test-single', 'concat:febwormsJs', 'concat:febwormsCss']);
  grunt.registerTask('build', ['vendor', 'app', 'febworms', 'ejs', 'clean:postBuild']);
  grunt.registerTask('default', 'build');

};
