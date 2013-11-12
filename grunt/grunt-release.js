var _ = require('lodash');

module.exports = function (grunt, commonConfig) {

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

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
       src: [ '<%= files.app.jsSrc %>' ],
       dest: 'tmp/app/app.ngmin.js'
      },
      febworms: {
        src: [ '<%= files.febworms.jsSrc %>' ],
        dest: 'tmp/febworms/febworms.ngmin.js'
      }
    },
    uglify: {
      app: {
        src: [ '<%= ngmin.app.dest %>', '<%= html2js.app.dest %>' ],
        dest: 'dist/<%= files.app.js %>'
      },
      febworms: {
        src: [ '<%= ngmin.febworms.dest %>', '<%= html2js.febworms.dest %>' ],
        dest: 'dist/<%= files.febworms.js %>'
      }
    },
    cssmin: {
      app: {
        src: [ '<%= files.app.cssSrc %>' ],
        dest: 'dist/<%= files.app.css %>'
      },
      febworms: {
        src: [ '<%= files.febworms.cssSrc %>' ],
        dest: 'dist/<%= files.febworms.css %>'
      }
    },
    copy: {
      vendor: {
        src: [
          '<%= files.vendor.js %>', '<%= files.vendor.css %>', '<%= files.vendor.other %>'
        ],
        dest: 'dist/'
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [ '<%= files.app.other %>' ],
            dest: 'dist/'
          }
        ]
      },
      febworms: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [ '<%= files.febworms.other %>' ],
            dest: 'dist/'
          }
        ]
      }
    }
  };

  gruntConfig = _.extend({}, commonConfig, gruntConfig);

  grunt.config.init(gruntConfig);

  grunt.registerTask('vendor', [ 'clean:vendor', 'copy:vendor' ]);
  grunt.registerTask('app', [ 'clean:app', 'html2js:app', 'ngmin:app', 'uglify:app', 'cssmin:app', 'copy:app' ]);
  grunt.registerTask('febworms', [ 'clean:febworms', 'html2js:febworms', 'ngmin:febworms', 'uglify:febworms', 'cssmin:febworms', 'copy:febworms' ]);

  grunt.registerTask('build', [ 'clean:tmp', 'vendor', 'app', 'febworms', 'ejs', 'clean:postBuild', 'test-build' ]);
  grunt.registerTask('default', 'build');

};