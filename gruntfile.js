var fs = require('fs');
var _ = require('lodash');

module.exports = function (grunt) {

  var files = require('./project-files');

  function getIncludes(ext, sections, cwd, prefix) {

    sections = sections || [ 'vendor', 'febworms', 'app' ];
    cwd = cwd || 'dist';

    if(prefix) {
      if(_.isBoolean(prefix)) {
        prefix = cwd;
      }

      if(prefix[prefix.length-1] !== '/') prefix += '/';
    }

    var globs = [];

    _.forEach(sections, function(section) {
      globs = globs.concat(files[section][ext]);
    });

    var results = grunt.file.expand({ cwd: cwd }, globs);

    if(prefix) {
      results = _.map(results, function(val) { return prefix + val; });
    }

    return results;
  }

  grunt.loadNpmTasks('grunt-ejs-render');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ngmin');

  var gruntConfig = {
    files: files,
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
    ngmin: {
      app: {
        src: [ 'src/app/app.js', 'tmp/templates-app.js', 'src/app/**/*.js' ],
        dest: 'dist/app/app.js'
      }
    },
//    concat: {
//      app: {
//        files: {
//          'dist/app/app.js': [ 'src/app/app.js', 'tmp/templates-app.js', 'src/app/**/*.js' ],
//          'dist/app/app.css': [ 'src/app/**/*.css' ]
//        }
//      }
//    },
    clean: {
      febworms: [ 'dist/febworms' ],
      tmp: [ 'tmp' ],
      app: [ 'dist/app' ],
      vendor: [ 'dist/vendor' ],
      postBuild: {
        src: [ 'dist/**/*' ],
        filter: function (filepath) {
          // Removes only empty folders
          return grunt.file.isDir(filepath) && fs.readdirSync(filepath).length === 0;
        }
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
    },
    render: {
      index: {
        options: { helpers: { getIncludes: getIncludes } },
        files: { 'dist/index.html': [ 'src/index.ejs' ] }
      },
      karmaConf: {
        options: { helpers: { getIncludes: getIncludes } },
        files: { 'karma.conf.js': [ 'karma.conf.ejs' ] }
      }
    }
  };

  grunt.config.init(gruntConfig);

//  grunt.registerTask('release', [ 'clean:tmp', 'html2js:app', 'clean:app', 'ngmin:app', 'copy:app', 'ejs:index', 'clean:postBuild' ]);
  grunt.registerTask('vendor', [ 'clean:vendor', 'copy:vendor' ]);
  grunt.registerTask('app', [ 'clean:app', 'html2js:app', 'copy:app' ]);
  grunt.registerTask('febworms', [ 'clean:febworms', 'html2js:febworms', 'copy:febworms' ]);

  grunt.registerTask('build', [ 'vendor', 'app', 'febworms', 'render:index', 'render:karmaConf', 'clean:postBuild' ]);
  grunt.registerTask('default', 'build');

};