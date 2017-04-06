'use strict';

/**
 * The AngularJS WeatherMood app configrution
 */
angular.module('weatherMoodApp')

  .config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('brown')
      .dark();

  });
