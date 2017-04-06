'use strict';

/**
 * The AngularJS WeatherMood app configrution
 */
angular.module('weatherMoodApp')

  .config(function ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        template: ' '
      })
      .state({
        name: 'playlists',
        url: '/playlists/:key',
        component: 'playlists',
        resolve: {
          playlists: function (DeezerService, $stateParams) {
            return DeezerService.playlistSearch($stateParams.key);
          }
        }
      })
      .state({
        name: 'tracks',
        url: '/tracks/:id',
        component: 'tracks',
        resolve: {
          tracks: function (DeezerService, $stateParams) {
            return DeezerService.playlistPlay($stateParams.id);
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  });