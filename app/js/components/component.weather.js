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
    icon: '@',
    query: '@',
    color: '@'
  },

  controller: function (WeatherService) {
    'ngInject';

    this.$onInit = () => {
      this.color = 'brown';
      this.data = null;
    }

    // Save the new recipe
    this.getWeather = (query) => {

      this.parent.showLoader(true);
      this.data = null;

      WeatherService.get(query).then((data) => {

        this.data = data;
        this.icon = data.icon;

        this.parent.searchMusic(data.weather[0].main);

      }).catch((err) => {
        this.parent.showToast(err);
      }).finally(() => {
        this.parent.showLoader(false);
      });
    };

  }

});