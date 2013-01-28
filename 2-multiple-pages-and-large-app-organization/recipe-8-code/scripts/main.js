/*global require, document */

// Add common libraries to the config paths for easier reference
require.config({
  paths: {
    "jquery": "/js/jquery.min",
    "jquerymobile": "/js/jquery.mobile.min"
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
