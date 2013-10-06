
var files = {
  febworms: {
    js: 'febworms/febworms.min.js',
    jsSrc: [
      'src/febworms/febworms.js',
      'src/febworms/**/*.js',
      '!src/febworms/**/*.test.js'
    ],
    css: 'febworms/febworms.min.css',
    cssSrc: [
      'src/febworms/febworms.css',
      'src/febworms/**/*.css'
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
      'vendor/angular/angular.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-route/angular-route.js',
      'vendor/lodash/dist/lodash.compat.js',
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
    js: 'app/app.min.js',
    jsSrc: [
      'src/app/app.js',
      'src/app/**/*.js',
      '!src/app/**/*.test.js'
    ],
    css: 'app/app.min.css',
    cssSrc: [
      'src/app/app.css',
      'src/app/**/*.css'
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
