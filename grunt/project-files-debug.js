
var files = {
  febworms: {
    js: [
      'febworms/febworms.js',
      'febworms/**/*.js',
      '!febworms/**/*.test.js'
    ],
    css: [
      'febworms/febworms.css',
      'febworms/**/*.css'
    ],
    test: [
      'febworms/**/*.test.js'
    ],
    other: [
      'febworms/**/*.png',
      'febworms/**/*.jpg'
    ],
    html2js: [
      'febworms/templates-febworms.js'
    ]
  },

  vendor: {
    js: [
      'vendor/bower-angular-1.1.5/angular.js',
      'vendor/bower-angular-1.1.5/angular-resource.js',
      'vendor/lodash/dist/lodash.compat.js'
    ],
    test: [
      'vendor/jquery/jquery.js',
      'vendor/bower-angular-1.1.5/angular.js',
      'vendor/bower-angular-1.1.5/angular-resource.js',
      'vendor/lodash/dist/lodash.compat.js',
      'vendor/bower-angular-1.1.5/angular-mocks.js'
    ],
    css: [
      'vendor/bootstrap-css/css/bootstrap.css',
      'vendor/bootstrap-css/css/bootstrap-responsive.css'
    ],
    other: [
      'vendor/**/*.png',
      'vendor/**/*.jpg'
    ]
  },
  
  app: {
    js: [
      'app/app.js',
      'app/**/*.js',
      '!app/**/*.test.js'
    ],
    css: [
      'app/app.css',
      'app/**/*.css'
    ],
    test: [
      'app/**/*.test.js'
    ],
    other: [
      'app/**/*.png',
      'app/**/*.jpg'
    ],
    html2js: [
      'app/templates-app.js'
    ]
  }
};

module.exports = files;
