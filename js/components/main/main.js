'use strict';

/**
 * The main app component
 */
angular.module('weatherMood.components').component("main", {

  templateUrl: '/js/components/main/main.html',

  bindings: {
    loading: '<'
  },

  controller: function (DeezerService, $scope, $state, $mdToast, WEATHER_EVENTS, PLAY_EVENTS) {
    'ngInject';

    this.showLoader = (load) => {
      this.loading = load;
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
    $scope.$on(WEATHER_EVENTS.meteo, (event, key) => {
      $state.go('playlists', { key: key }, { reload: true });
    });

    /**
     * Track play cancelled, return to home page
     */
    $scope.$on(PLAY_EVENTS.stop, (event) => {
      $state.go('home', null, { reload: true });
    });
  }

});