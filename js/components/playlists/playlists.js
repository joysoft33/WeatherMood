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

  controller: function () {
    'ngInject';

    this.$onInit = () => {
      console.log('Playlists initialized');
    };

    this.$onChanges = (event) => {
      console.log('Playlists loaded');
    };
  }

});