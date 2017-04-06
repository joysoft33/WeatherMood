'use strict';

/**
 * The Weather component
 */
angular.module('weatherMood.components').component("weather", {

  templateUrl: '/js/components/weather/weather.html',

  require: {
    parent: '^main'
  },
  
  bindings: {
    data: '<'
  },

  controller: function (WeatherService, $scope, WEATHER_EVENTS) {
    'ngInject';

    /**
     * Get current weather for the supplied city
     */
    this.getWeather = (query) => {

      this.parent.showLoader(true);

      WeatherService.get(query).then((data) => {

        this.data = data;

        // Dispatch message on the parent scope
        $scope.$emit(WEATHER_EVENTS.meteo, data.weather[0].main);

      }).catch((err) => {
        this.parent.showToast(err);
      }).finally(() => {
        this.parent.showLoader(false);
      });
    };

  }

});