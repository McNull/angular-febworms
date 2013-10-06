var _ = require('lodash');

module.exports = function (grunt, commonConfig) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');

  var gruntConfig = {
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
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              '<%= files.febworms.js %>',
              '<%= files.febworms.css %>',
              '<%= files.febworms.other %>',
              '!<%= files.febworms.test %>'
            ],
            dest: 'dist/'
          }
        ]
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              '<%= files.app.js %>',
              '<%= files.app.css %>',
              '<%= files.app.other %>',
              '!<%= files.app.test %>'
            ],
            dest: 'dist/'
          }
        ]
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

  gruntConfig = _.extend({}, commonConfig, gruntConfig);

  grunt.config.init(gruntConfig);

  grunt.registerTask('vendor', [ 'clean:vendor', 'copy:vendor' ]);
  grunt.registerTask('app', [ 'clean:app', 'html2js:app', 'copy:app' ]);
  grunt.registerTask('febworms', [ 'clean:febworms', 'html2js:febworms', 'copy:febworms' ]);

  grunt.registerTask('build', [ 'vendor', 'app', 'febworms', 'ejs', 'clean:postBuild' ]);
  grunt.registerTask('default', 'build');

};