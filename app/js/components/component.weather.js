'use strict';

/**
 * The Weather component
 */
angular.module('weatherMood.components').component("weather", {

  templateUrl: '/views/weather.html',

  require: {
    parent: '^main'
  },
  
  bindings: {
    data: '<',
    query: '@'
  },

  controller: function (WeatherService, PLAY_EVENTS) {
    'ngInject';

    this.$onInit = () => {
      this.data = null;
    }

    /**
     * Get current weather for the supplied city
     */
    this.getWeather = (query) => {

      this.parent.showLoader(true);
      this.data = null;

      WeatherService.get(query).then((data) => {

        this.data = data;

        // Let parent component relay the information
        this.parent.broadcast(PLAY_EVENTS.search, data.weather[0].main);

      }).catch((err) => {
        this.parent.showToast(err);
      }).finally(() => {
        this.parent.showLoader(false);
      });
    };

  }

});