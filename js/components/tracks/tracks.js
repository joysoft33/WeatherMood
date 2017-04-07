'use strict';

/**
 * The Deezer component
 */
angular.module('weatherMood.components').component("tracks", {

  templateUrl: '/js/components/tracks/tracks.html',

  bindings: {
    showToast: '&',
    showLoader: '&',
    pause: '<',
    currentTrack: '<',
    playlistId: '<',
    tracks: '<'
  },

  controller: function (DeezerService, $scope, $stateParams, PLAY_EVENTS) {
    'ngInject';

    this.$onInit = () => {
      this.pause = false;
      this.playlistId = $stateParams.id;
    };

    this.cancel = () => {
      DeezerService.trackPause();
      $scope.$emit(PLAY_EVENTS.stop);
    };

    /**
     * Start playing the requested playlist's track
     */
    this.trackPlay = (index) => {

      this.showLoader({show: true});

      DeezerService.playlistPlay(this.playlistId, index).then((data) => {
        console.log('playing...');
      }).catch((err) => {
        this.showToast({message: err});
      }).finally(() => {
        this.showLoader({show: false});
      });
    };

    /**
     * Pilot the music player
     */
    this.trackNext = () => {
      DeezerService.trackNext();
    };

    this.trackPause = () => {
      if (this.pause) {
        DeezerService.trackPlay();
      } else {
        DeezerService.trackPause();
      }
    };

    /**
     * Process external notifications
     */
    $scope.$on(PLAY_EVENTS.track, (evt, track) => {
      console.log(`playing ${track.title}`);
      this.currentTrack = track;
    });

    $scope.$on(PLAY_EVENTS.pause, () => {
      this.pause = true;
    });

    $scope.$on(PLAY_EVENTS.play, () => {
      this.pause = false;
    });
  }

});