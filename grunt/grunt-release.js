var _ = require('lodash');

module.exports = function (grunt, commonConfig) {

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ngmin');

  var gruntConfig = {
    html2js: {
      app: {
        src: ['src/app/**/*.tmpl.html'],
        dest: 'tmp/app/templates-app.js'
      },
      febworms: {
        src: ['src/febworms/**/*.tmpl.html'],
        dest: 'tmp/febworms/templates-febworms.js'
      }
    },
    ngmin: {
      app: {
        expand: true,
        cwd: 'src/',
        src: [
          '<%= files.app.js %>',
          '<%= html2js.app.dest %>'
        ],
        dest: '/tmp'
      }
    },
    copy: {
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
  grunt.registerTask('app', [ 'clean:app', 'html2js:app' ]);

  //grunt.registerTask('febworms', [ 'clean:febworms', 'html2js:febworms', 'copy:febworms' ]);

  //grunt.registerTask('build', [ 'vendor', 'app', 'febworms', 'render:index', 'render:karmaConf', 'clean:postBuild' ]);

  grunt.registerTask('build', [ 'clean:tmp', 'vendor', 'app', 'febworms', 'ejs', 'clean:postBuild' ]);
  grunt.registerTask('default', 'build');

};