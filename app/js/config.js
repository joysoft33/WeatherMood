angular.module('weatherMoodApp')

  .config(function ($mdThemingProvider) {

    // Configure a dark theme with primary foreground white

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('pink')
      .dark();

  });