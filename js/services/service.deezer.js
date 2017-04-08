'use strict';

/**
 * The Deezer service
 */
angular.module('weatherMood.services').service('DeezerService',

  function ($timeout, $rootScope, $http, $log, $q, PLAY_EVENTS) {
    'ngInject';

    const CHANNEL_URL = 'http://localhost:8080/channel.html';
    const APP_ID = '229702';
    const LOGNS = 'DS ::';

    const EVENTS = [
      'player_loaded',
      'current_track',
      'player_paused',
      'tracklist_changed',
      'player_play'
    ];

    this.loaded = false;

    /**
     * Initialize the DZ SDK and subscribe to the needed player events
     */
    this.init = function () {

      DZ.init({
        appId: APP_ID,
        channelUrl: CHANNEL_URL,
        player: true
      });

      for (let evt of EVENTS) {
        DZ.Event.subscribe(evt, this.playerNotification);
      }

      $log.debug(LOGNS, 'DZ initialized');
    };

    /**
     * Log to the DZ service (not used for the moment)
     */
    this.login = () => {
      var deferred = $q.defer();

      DZ.login((response) => {
        if (response.authResponse) {
          $log.debug(LOGNS, 'logged');
          deferred.resolve(response.data);
        } else {
          $log.debug(LOGNS, 'not logged');
          deferred.reject(response.data);
        }
      }, {
        scope: 'manage_library,basic_access'
      });

      return deferred.promise;
    };

    /**
     * Search for playlists corresponding to the given keyword
     */
    this.playlistSearch = (key) => {

      $log.debug(LOGNS, `Searching for playlist with ${key}`);
      var deferred = $q.defer();

      var listSearch = () => {
        DZ.api('/search/playlist?q=' + encodeURIComponent(key), (response) => {
          if (response.data) {
            $log.debug(LOGNS, `${response.data.length} playlists received`);
            deferred.resolve(response.data);
          } else {
            var message = response.error ? response.error.message : 'error';
            $log.debug(LOGNS, `Playlist search error: ${message}`);
            deferred.reject(message);
          }
        });
      };

      if (this.loaded) {
        listSearch();
      } else {
        DZ.Event.subscribe('player_loaded', () => {
            listSearch();
          },
          true);
      }

      return deferred.promise;
    };

    /**
     * Select and play the requested playlist
     */
    this.playlistPlay = (playlistId, index = 0) => {

      $log.debug(LOGNS, `Playing playlist ${playlistId} / ${index}`);
      var id = Number(playlistId);
      var deferred = $q.defer();

      var listPlay = () => {
        DZ.player.playPlaylist(id, index, (response) => {
          if (response.tracks) {
            deferred.resolve(response.tracks);
          } else {
            var message = response.error ? response.error.message : 'error';
            $log.debug(LOGNS, `Playlist play error: ${message}`);
            deferred.reject(message);
          }
        });
      };

      if (this.loaded) {
        listPlay();
      } else {
        DZ.Event.subscribe('player_loaded', () => {
            listPlay();
          },
          true);
      }

      return deferred.promise;
    };

    /**
     * DZ player commands
     */
    this.trackNext = () => {
      DZ.player.next();
    };

    this.trackPlay = () => {
      DZ.player.play();
    };

    this.trackPause = () => {
      DZ.player.pause();
    };

    /**
     * Receive DZ player notifications
     */
    this.playerNotification = (data, event) => {

      $log.debug(LOGNS, `notification ${event}`);

      switch (event) {
        case 'current_track':
          $rootScope.$broadcast(PLAY_EVENTS.track, data.track);
          break;
        case 'player_paused':
          $rootScope.$broadcast(PLAY_EVENTS.pause);
          break;
        case 'player_play':
          $rootScope.$broadcast(PLAY_EVENTS.play);
          break;
        case 'player_loaded':
          this.loaded = true;
          break;
      }
    };

  });