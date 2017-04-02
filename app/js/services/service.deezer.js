'use strict';

/**
 * The Deezer service
 */
angular.module('weatherMood.services').service('DeezerService',

  function ($http, $log, $q) {
    'ngInject';

    const LOGNS = 'DS ::';
    const APP_ID = '229702';
    const CHANNEL_URL = 'http://localhost:8080/views/channel.html';

    this.init = function (callback) {

      DZ.init({
        appId: APP_ID,
        channelUrl: CHANNEL_URL,
        player: {
        }
      });

      DZ.Event.subscribe('player_loaded', callback);
      DZ.Event.subscribe('current_track', callback);
      DZ.Event.subscribe('player_paused', callback);
      DZ.Event.subscribe('tracklist_changed', callback);
      DZ.Event.subscribe('player_play', callback);

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

  });