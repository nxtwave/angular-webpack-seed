(function() {
  'use strict';

  angular.module('app', [
    'app.home',
    'app.layout'
  ]);

  require('bootstrap/dist/css/bootstrap.css');
  require('./app.css');

  require('./home/home.module.js');
  require('./layout/layout.module.js');

})();

