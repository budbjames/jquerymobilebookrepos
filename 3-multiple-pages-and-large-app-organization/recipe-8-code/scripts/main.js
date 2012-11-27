/*global require, document */

// Add common libraries to the config paths for easier reference
require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.8.2.min",
    "jquerymobile": "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min"
  }
});

// Load our libraries and the router
require([
  "jquery",
  "jquerymobile",
  "routers/router"
], function(
    $, jquerymobile, Router
) {

  "use strict";

  // Initialize the router
  var router = new Router();
  router.init();

  // Do some jQuery Mobile configuration
  $(document).on("mobileinit", function () {

    // Prevents anchor tag click handling from messing up the url
    $.mobile.linkBindingEnabled = false;

    // Prevents jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;

  });

});