'use strict';

/**
 * The Deezer component
 */
angular.module('weatherMood.components').component("playlists", {

  templateUrl: '/js/components/playlists/playlists.html',

  require: {
    parent: '^main'
  },
  
  bindings: {
    playlists: '<'
  },

  controller: function (DeezerService, $scope, PLAY_EVENTS) {
    'ngInject';

    this.$onInit = () => {
      console.log(this.playLists);
    };
  }

});