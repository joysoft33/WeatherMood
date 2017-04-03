'use strict';

/**
 * The Deezer service
 */
angular.module('weatherMood.services').service('DeezerService',

  function ($rootScope, $http, $log, $q, PLAY_EVENTS) {
    'ngInject';

    const LOGNS = 'DS ::';
    const APP_ID = '229702';
    const CHANNEL_URL = 'http://localhost:8080/views/channel.html';

    const EVENTS = [
      'player_loaded',
      'current_track',
      'player_paused',
      'tracklist_changed',
      'player_play'
    ];

    this.init = function () {

      DZ.init({
        appId: APP_ID,
        channelUrl: CHANNEL_URL,
        player: {
        }
      });

      for (let evt of EVENTS) {
        DZ.Event.subscribe(evt, this.playerNotification);
      }

      $log.debug(LOGNS, 'DZ initialized');
    };

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

    this.playlistSearch = (key) => {

      $log.debug(LOGNS, `DZ searching for ${key}`);
      var deferred = $q.defer();

      DZ.api('/search/playlist?q=' + encodeURIComponent(key), (response) => {
        if (response.data) {
          $log.debug(LOGNS, `${response.data.length} tracks received`);
          deferred.resolve(response.data);
        } else {
          $log.debug(LOGNS, `tracks search error: ${response}`);
          deferred.reject(response);
        }
      });

      return deferred.promise;
    };

    this.playlistPlay = (playlistId, index = 0) => {
      var deferred = $q.defer();

      DZ.player.playPlaylist(playlistId, index, (response) => {
        deferred.resolve(response.tracks);
        DZ.player.play();
      });

      return deferred.promise;
    };

    this.trackNext = () => {
      DZ.player.next();
    };

    this.trackPlay = () => {
      DZ.player.play();
    };

    this.trackPause = () => {
      DZ.player.pause();
    };

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
      }
    };

  });