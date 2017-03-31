'use strict';

/**
 * The Deezer component
 */
angular.module('weatherMood.components').component("deezer", {

  templateUrl: '/views/deezer.html',

  bindings: {
    playlist: '<',
  },

  controller: function (DeezerService, $rootScope) {
    'ngInject';

    $rootScope.$on('PLAY_EVENT', (event, description) => {
      console.log('EVENT : ' + description);
      this.playlistSearch(description);
    });
    
    this.$onInit = () => {
      console.log('DINIT...');
      DeezerService.init();
      console.log('DINIT done');
    };

    this.playlistSearch = (key) => {
      DeezerService.search(key).then((data) => {
        this.playlist = data;
      }).catch((err) => {});
    };

    this.playTrack = (id) => {
      DeezerService.play(id).then((data) => {
        console.log(data);
      }).catch((err) => {});
    };
  }

});