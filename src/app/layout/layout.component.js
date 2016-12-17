(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('layout', {
      template: require('./layout.view.html'),
      controller: LayoutController
    });

  function LayoutController() {
    var vm = this;
  }

})();
