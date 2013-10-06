
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
      'vendor/angular/angular.min.js',
      'vendor/angular-resource/angular-resource.min.js',
      'vendor/angular-route/angular-route.min.js',
      'vendor/lodash/dist/lodash.compat.min.js'
    ],
    test: [
      'vendor/angular-mocks/angular-mocks.js'
    ],
    css: [
      'vendor/bootstrap-css/css/bootstrap.min.css',
      'vendor/bootstrap-css/css/bootstrap-responsive.min.css'
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
