'use strict';

/**
 * The Deezer component
 */
angular.module('weatherMood.components').component("main", {

  templateUrl: '/views/main.html',

  bindings: {
    loading: '<'
  },

  controller: function ($scope, $mdToast) {
    'ngInject';

    this.showLoader = (load) => {
      this.loading = load;
    };

    this.showToast = (message) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(message)
        .position('top right')
        .hideDelay(3000)
      );
    };

    this.broadcast = (event, ...args) => {
      $scope.$broadcast(event, args);
    };
  }

});