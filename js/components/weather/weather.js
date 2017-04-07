'use strict';

/**
 * The Weather component
 */
angular.module('weatherMood.components').component("weather", {

  templateUrl: '/js/components/weather/weather.html',

  bindings: {
    showToast: '&',
    showLoader: '&',
    getMusic: '&',
    data: '<'
  },

  controller: function (WeatherService, $scope) {
    'ngInject';

    /**
     * Get current weather for the supplied city
     */
    this.getWeather = (query) => {

      this.showLoader({show: true});

      WeatherService.get(query).then((data) => {

        // Save meteo data for the requested city
        this.data = data;

        // Request music playlists based on this weather
        this.getMusic({key: data.weather[0].main});

      }).catch((err) => {
        this.showToast({message: err});
      }).finally(() => {
        this.showLoader({show: false});
      });
    };

  }

});