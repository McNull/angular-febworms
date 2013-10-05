module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],




    // list of files / patterns to load in the browser
    files: [
      "vendor/angular/angular.js",
      "vendor/angular-resource/angular-resource.js",
      "vendor/angular-route/angular-route.js",
      "vendor/lodash/dist/lodash.js",
      "vendor/angular-mocks/angular-mocks.js",
      "src/febworms/febworms.js",
      "src/febworms/edit/feb-edit-controller.js",
      "src/febworms/edit/feb-edit-directive.js",
      "src/app/app.js",
      "src/app/common/directives.js",
      "src/app/form/edit/form-edit.js",
      "src/app/form/list/form-list-controller.js",
      "src/app/form/list/form-list-directive.js",
      "src/app/navbar/navbar-controller.js",
      "src/app/navbar/navbar-directive.js",
      "src/app/notifications/notifications.js",
      "dist/febworms/templates-febworms.js",
      "dist/app/templates-app.js",
      "src/app/navbar/navbar-controller.test.js"
],

    // list of files to exclude
    exclude: [],

    // test results reporter to use‰‰
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome' ],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
