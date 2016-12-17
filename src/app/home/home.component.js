(function() {
  'use strict';

  angular
    .module('app.home')
    .component('home', {
      template: require('./home.view.html'),
      controller: HomeController
    });

  function HomeController() {
    var vm = this;

    vm.$onInit = function() {
      console.log('app.home.oninit');
    };

  }


})();
