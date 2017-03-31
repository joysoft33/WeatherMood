'use strict';

/**
 * The Weather service
 */
angular.module('weatherMood.services').service('WeatherService',

  function ($http, $log, $q) {
    'ngInject';

    const API_URL = "http://api.openweathermap.org/data/2.5/weather?lang=fr&units=metric&q=";
    const API_KEY = "2c8c22e7283717b657e8dd338db9fc51";
    const LOGNS = 'OWM ::';

    this.get = function (city) {
      var deferred = $q.defer();

      $http.get(API_URL + city + "&APPID=" + API_KEY).then((response) => {
        console.log(LOGNS, 'ok');
        deferred.resolve(response.data);
      }).catch((error) => {
        console.log(LOGNS, 'error');
        deferred.reject(error);
        $log.error(error);
      });

      return deferred.promise;
    };

  });