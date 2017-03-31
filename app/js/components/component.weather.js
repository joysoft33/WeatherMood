'use strict';

/**
 * The Weather component
 */
angular.module('weatherMood.components').component("weather", {

  templateUrl: '/views/weather.html',

  bindings: {
    general: '<',
    weather: '<',
    icon: '@',
    query: '@'
  },

  controller: function (WeatherService, $rootScope) {
    'ngInject';

    this.$rootScope = $rootScope;

    // Save the new recipe
    this.getWeather = (query) => {
      WeatherService.get(query).then((data) => {
        this.weather = data.weather[0];
        this.general = data.main;
        this.icon = `http://openweathermap.org/img/w/${this.weather.icon}.png`;
        this.$rootScope.$emit('PLAY_EVENT', this.weather.main);
      }).catch((err) => {});
    };

  }

});