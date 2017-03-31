'use strict';

/**
 * The Weather component
 */
angular.module('weatherMood.components').component("weather", {

  templateUrl: '/views/weather.html',

  bindings: {
    data: '<',
    icon: '@',
    query: '@',
    color: '@',
    error: '<'
  },

  controller: function (WeatherService, $rootScope, $mdToast) {
    'ngInject';

    this.$onInit = () => {
      this.color = 'brown';
      this.error = '';
    }

    // Save the new recipe
    this.getWeather = (query) => {

      $rootScope.loading = true;
      this.error = false;

      WeatherService.get(query).then((data) => {

        this.data = data;
        this.icon = data.icon;

        $rootScope.$emit('PLAY_EVENT', data.weather[0].main);

      }).catch((err) => {
        this.error = true;
        this.showToast(err);
      }).finally(() => {
        $rootScope.loading = false;
      });
    };

    this.showToast = (message) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(message)
        .position('top right')
        .hideDelay(3000)
      );
    };

  }

});