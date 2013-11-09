module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../',


    // frameworks to use
    frameworks: ['jasmine'],




    // list of files / patterns to load in the browser
    files: [
      "vendor/jquery/jquery.js",
      "vendor/angular/angular.js",
      "vendor/angular-resource/angular-resource.js",
      "vendor/angular-route/angular-route.js",
      "vendor/lodash/dist/lodash.compat.js",
      "vendor/angular-mocks/angular-mocks.js",
      "src/febworms/febworms.js",
      "src/febworms/drag/angular-drag-queen.js",
      "src/febworms/drag/dq-drag-area.js",
      "src/febworms/drag/dq-drag-track.js",
      "src/febworms/drag/dq-draggable.js",
      "src/febworms/edit/canvas/canvas-controller.js",
      "src/febworms/edit/canvas/canvas-directive.js",
      "src/febworms/edit/canvas/field/field-directive.js",
      "src/febworms/edit/canvas/field/properties/properties-directive.js",
      "src/febworms/edit/edit-controller.js",
      "src/febworms/edit/edit-directive.js",
      "src/febworms/edit/form-actions/form-actions-directive.js",
      "src/febworms/edit/meta/meta-directive.js",
      "src/febworms/edit/palette/categories/categories-controller.js",
      "src/febworms/edit/palette/categories/categories-directive.js",
      "src/febworms/edit/palette/palette-controller.js",
      "src/febworms/edit/palette/palette-directive.js",
      "src/febworms/febworms-bind-expression.js",
      "src/febworms/febworms-utils.js",
      "src/febworms/render/field-controller.js",
      "src/febworms/render/field-directive.js",
      "src/febworms/render/field-input-directive.js",
      "src/febworms/render/form-controller.js",
      "src/febworms/render/form-directive.js",
      "src/febworms/render/render-directive.js",
      "src/febworms/render/schema-controller.js",
      "src/febworms/render/schema-directive.js",
      "src/febworms/validation/summary-directive.js",
      "src/febworms/validation/unique-field-name.js",
      "src/app/app.js",
      "src/app/common/directives.js",
      "src/app/form/config.js",
      "src/app/form/edit.js",
      "src/app/form/index.js",
      "src/app/jsonify/jsonify.js",
      "src/app/navbar/navbar-controller.js",
      "src/app/navbar/navbar-directive.js",
      "src/app/notifications/notifications.js",
      "dist/febworms/templates-febworms.js",
      "dist/app/templates-app.js",
      "src/febworms/edit/canvas/canvas-directive.test.js",
      "src/febworms/edit/canvas/field/properties/properties-directive.test.js",
      "src/febworms/edit/edit-controller.test.js",
      "src/febworms/edit/edit-directive.test.js",
      "src/febworms/edit/form-actions/form-actions-directive.test.js",
      "src/febworms/edit/meta/meta-directive.test.js",
      "src/febworms/edit/palette/categories/categories-controller.test.js",
      "src/febworms/edit/palette/categories/categories-directive.test.js",
      "src/febworms/edit/palette/palette-controller.test.js",
      "src/febworms/edit/palette/palette-directive.test.js",
      "src/febworms/febworms-bind-expression.test.js",
      "src/febworms/febworms-utils.test.js",
      "src/febworms/febworms.test.js",
      "src/febworms/render/field-controller.test.js",
      "src/febworms/render/field-directive.test.js",
      "src/febworms/render/field-input-directive.test.js",
      "src/febworms/render/form-controller.test.js",
      "src/febworms/render/form-directive.test.js",
      "src/febworms/render/render-directive.test.js",
      "src/febworms/render/schema-controller.test.js",
      "src/febworms/render/schema-directive.test.js",
      "src/febworms/validation/summary-directive.test.js",
      "src/febworms/validation/unique-field-name.test.js",
      "src/app/form/config.test.js",
      "src/app/navbar/navbar-controller.test.js"
],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['growl', 'dots'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS' ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
