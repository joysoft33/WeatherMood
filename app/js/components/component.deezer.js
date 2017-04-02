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

  controller: function (DeezerService, $scope) {
    'ngInject';

    this.$onInit = () => {
      DeezerService.init(this.playNotification);
      this.pauseButtonText = 'Pause';
    };

    $scope.$on('EVT_SEARCH', (evt, keyword) => {
      this.playlistSearch(keyword);
    });

    this.playlistSearch = (key) => {

      this.currentPlaylist = null;
      this.currentTrack = null;
      this.playLists = null;
      this.tracks = null;

      DeezerService.playlistSearch(key).then((data) => {
        this.playlists = data;
      }).catch((err) => {
        this.parent.showToast(err);
      });
    };

    this.playlistPlay = (playlist) => {
      DeezerService.playlistPlay(playlist.id).then((data) => {
        console.log('playing...');
        this.currentPlaylist = playlist;
        this.tracks = data;
      }).catch((err) => {
        this.parent.showToast(err);
      });
    };

    this.trackPlay = (index) => {
      if (this.currentPlaylist != null) {
        DeezerService.playlistPlay(this.currentPlaylist.id, index).then((data) => {
          console.log('playing...');
        }).catch((err) => {
          this.parent.showToast(err);
        });
      }
    };

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

    this.playNotification = (data, event) => {
      switch (event) {
        case 'current_track':
          console.log(`playing ${data.track.title}`);
          this.currentTrack = data.track;
          break;
        case 'player_loaded':
          console.log('player loaded');
          break;
        case 'player_paused':
          this.pauseButtonText = 'Play';
          break;
        case 'player_play':
          this.pauseButtonText = 'Pause';
          break;
        case 'tracklist_changed':
          console.log('tracklist changed');
          break;
      }
    };

  }

});