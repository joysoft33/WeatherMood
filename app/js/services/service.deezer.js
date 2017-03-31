'use strict';

/**
 * The Deezer service
 */
angular.module('weatherMood.services').service('DeezerService',

  function ($http, $log, $q) {
    'ngInject';

    const LOGNS = 'DS ::';
    const APP_ID = '229702';
    const APP_SECRET = '07a0e0d8a147a3b43ec6ed2a9dd62ddc';
    const CHANNEL_URL = 'http://localhost:8080/views/channel.html';

    this.init = function () {
      $log.debug(LOGNS, 'initializing');
      DZ.init({
        appId: APP_ID,
        channelUrl: CHANNEL_URL,
        player: {}
      });
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

    this.search = (key) => {
      var deferred = $q.defer();

      DZ.api('/search?q=' + encodeURIComponent(key), (response) => {
        $log.debug(LOGNS, 'search tracks', response.data);
        deferred.resolve(response.data);
      });

      return deferred.promise;
    };

    this.play = (trackId) => {
      var deferred = $q.defer();

      DZ.player.playTracks([trackId], 0, (response) => {
        $log.debug(LOGNS, "track list", response.tracks);
        deferred.resolve(response.tracks);
        DZ.player.play();
      });

      return deferred.promise;
    };

  });