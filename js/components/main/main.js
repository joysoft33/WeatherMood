'use strict';

/**
 * The main app component
 */
angular.module('weatherMood.components').component("main", {

  templateUrl: '/js/components/main/main.html',

  bindings: {
    loading: '<'
  },

  controller: function (DeezerService, $scope, $state, $mdToast, PLAY_EVENTS) {
    'ngInject';

    this.showLoader = (show) => {
      this.loading = show;
    };

    /**
     * Display error message
     */
    this.showToast = (message) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(message)
        .position('top right')
        .hideDelay(3000)
      );
    };

    /**
     * Activate playlists view when meteo has changed
     */
    this.getMusic = (key) => {
      $state.go('playlists', { key: key }, { reload: true });
    };

    /**
     * Track play cancelled, return to home page
     */
    $scope.$on(PLAY_EVENTS.stop, (event) => {
      $state.go('home', null, { reload: true });
    });
  }

});