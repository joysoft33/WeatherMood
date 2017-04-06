'use strict';

/**
 * The Deezer component
 */
angular.module('weatherMood.components').component("tracks", {

  templateUrl: '/js/components/tracks/tracks.html',

  require: {
    parent: '^main'
  },
  
  bindings: {
    pauseButtonText: '<',
    currentTrack: '<',
    playlistId: '<',
    tracks: '<'
  },

  controller: function (DeezerService, $scope, $stateParams, PLAY_EVENTS) {
    'ngInject';

    this.$onInit = () => {
      this.pauseButtonText = 'Pause';
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

      this.parent.showLoader(true);

      DeezerService.playlistPlay(this.playlistId, index).then((data) => {
        console.log('playing...');
      }).catch((err) => {
        this.parent.showToast(err);
      }).finally(() => {
        this.parent.showLoader(false);
      });
    };

    /**
     * Pilot the music player
     */
    this.trackNext = () => {
      DeezerService.trackNext();
    };

    this.trackPause = () => {
      if (this.pauseButtonText == 'Pause') {
        DeezerService.trackPause();
      } else {
        DeezerService.trackPlay();
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
      this.pauseButtonText = 'Play';
    });

    $scope.$on(PLAY_EVENTS.play, () => {
      this.pauseButtonText = 'Pause';
    });
  }

});