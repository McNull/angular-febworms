
var files = {
  febworms: {
    js: [
      'febworms/febworms.js',
      'febworms/**/*.js',
      '!febworms/**/*.test.js'
    ],
    css: [
      'febworms/febworms.css',
      'febworms/edit/edit.css',
      'febworms/edit/canvas/canvas.css',
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
      'vendor/angular/angular.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-route/angular-route.js',
      'vendor/lodash/dist/lodash.compat.js'
    ],
    test: [
      'vendor/json3/lib/json3.js',
      'vendor/jquery/jquery.js',
      'vendor/angular/angular.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-route/angular-route.js',
      'vendor/lodash/dist/lodash.compat.js',
      'vendor/angular-mocks/angular-mocks.js'
    ],
    css: [
      'vendor/bootstrap/dist/css/bootstrap.css'
//      'vendor/bootstrap-css/css/bootstrap.css',
//      'vendor/bootstrap-css/css/bootstrap-responsive.css'
    ],
    other: [
      'vendor/json3/lib/json3.min.js',
      'vendor/jquery/jquery.min.js',
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
