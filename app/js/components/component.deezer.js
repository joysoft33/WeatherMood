'use strict';

/**
 * The Deezer component
 */
angular.module('weatherMood.components').component("deezer", {

  templateUrl: '/views/deezer.html',

  require: {
    parent: '^main'
  },
  
  bindings: {
    playlist: '<',
  },

  controller: function (DeezerService, $scope) {
    'ngInject';

    this.$onInit = () => {
      DeezerService.init();
    };

    $scope.$on('EVT_SEARCH', (evt, keyword) => {
      this.playlistSearch(keyword);
    });

    this.playlistSearch = (key) => {
      DeezerService.search(key).then((data) => {
        this.playlist = data;
      }).catch((err) => {
        this.parent.showToast(err);
      });
    };

    this.playTrack = (id) => {
      DeezerService.play(id).then((data) => {
        console.log(data);
      }).catch((err) => {
        this.parent.showToast(err);
      });
    };
  }

});