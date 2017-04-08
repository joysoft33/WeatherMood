'use strict';

/**
 * The Deezer component
 */
angular.module('weatherMood.components').component("playlists", {

  templateUrl: '/js/components/playlists/playlists.html',

  bindings: {
    showToast: '&',
    showLoader: '&',
    playlists: '<'
  },

  controller: function (DeezerService, $scope, PLAY_EVENTS) {
    'ngInject';

    this.$onInit = () => {
      console.log('Playlists initialized');
    };

    this.$onChanges = (event) => {
      console.log('Playlists loaded');
    };
  }

});