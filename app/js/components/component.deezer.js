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
    pauseButtonText: '<',
    currentPlaylist: '<',
    currentTrack: '<',
    playlists: '<',
    tracks: '<'
  },

  controller: function (DeezerService, $scope, PLAY_EVENTS) {
    'ngInject';

    this.$onInit = () => {
      this.pauseButtonText = 'Pause';
      this.parent.showLoader(true);
      DeezerService.init();
      this.parent.showLoader(false);
    };

    /**
     * Search playlists correcponding to the given keywork
     */
    this.playlistSearch = (key) => {

      this.parent.showLoader(true);

      this.currentPlaylist = null;
      this.currentTrack = null;
      this.playLists = null;
      this.tracks = null;

      DeezerService.playlistSearch(key).then((data) => {
        this.playlists = data;
      }).catch((err) => {
        this.parent.showToast(err);
      }).finally(() => {
        this.parent.showLoader(false);
      });
    };

    /**
     * Start playing the requested playlist
     */
    this.playlistPlay = (playlist) => {

      this.parent.showLoader(true);

      DeezerService.playlistPlay(playlist.id).then((data) => {
        console.log('playing...');
        this.currentPlaylist = playlist;
        this.tracks = data;
      }).catch((err) => {
        this.parent.showToast(err);
      }).finally(() => {
        this.parent.showLoader(false);
      });
    };

    /**
     * Start playing the requested playlist's track
     */
    this.trackPlay = (index) => {
      if (this.currentPlaylist != null) {

        this.parent.showLoader(true);

        DeezerService.playlistPlay(this.currentPlaylist.id, index).then((data) => {
          console.log('playing...');
        }).catch((err) => {
          this.parent.showToast(err);
        }).finally(() => {
          this.parent.showLoader(false);
        });
      }
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
    $scope.$on(PLAY_EVENTS.search, (evt, keyword) => {
      this.playlistSearch(keyword);
    });

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