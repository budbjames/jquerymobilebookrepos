/*global define, require */

define([
	"jquery"
], function ($) {

	"use strict";

	return function () {

		// This does the actual routing
		this.route = function (event) {

			var model;

			// If the route was called from a link being clicked, get the reference from the link
			if (typeof event === "object") {
				model = $(event.target).attr("href").replace("#/", "");

			// The model is the string that was passed in
			} else {
				model = event;
			}

			// Get the list view and the model that was requested
			require([
			  
			  "views/listview",
				"models/" + model

			], function (View, Model) {
			
				// Render the view and pass in the model	
				var view = new View();
				view.render(Model);
			
			});

			return false;

		};

		// This is called by main.js
		this.init = function (app) {

			// When the user clicks on any link, we will call the router
			$("body").delegate("a","click", this.route);

			// Call the router right away
			this.route("main");

		};

	};

});