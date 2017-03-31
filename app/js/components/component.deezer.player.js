'use strict';

/**
 * The Deezer player component
 */
angular.module('weatherMood.components').component("deezerPlayer", {

  templateUrl: '/views/player.html',

  bindings: {
    trackId: '<',
    api: '=',
  },

  require: {
    parent: '^deezer'
  },

  controller: function (DeezerService) {
    'ngInject';

    this.$onInit = () => {
      this.api = {};
      this.api.play = this.play;
    };

    this.play = (id) => {
      console.log("play ! " + id);
      this.trackId = id;
    }
  }

});