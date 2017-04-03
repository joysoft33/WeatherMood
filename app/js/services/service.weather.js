'use strict';

/**
 * The Weather service
 */
angular.module('weatherMood.services').service('WeatherService',

  function ($http, $log, $q) {
    'ngInject';

    const API_URL = "http://api.openweathermap.org/data/2.5/weather?lang=fr&units=metric&q=";
    const API_KEY = "2c8c22e7283717b657e8dd338db9fc51";
    const LOGNS = 'WS ::';

    /**
     * Request the weather for the given city
     */
    this.get = function (city) {

      $log.debug(LOGNS, `requesting ${city} weather`);
      var deferred = $q.defer();

      $http.get(API_URL + city + "&APPID=" + API_KEY).then((response) => {
        
        $log.debug(LOGNS, `${city} weather is ${response.data.weather[0].main}`);

        // Add the default icon url to the retrieved weather object
        try {
          response.data.icon = `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
        } catch (e) {
          $log.warn(LOGNS, e);
        }
        
        deferred.resolve(response.data);

      }).catch((error) => {
        var message = error.data ? error.data.message : error.message || error.statusText;
        $log.debug(LOGNS, `${city} weather request error ${message}`);
        deferred.reject(message);
      });

      return deferred.promise;
    };

  });