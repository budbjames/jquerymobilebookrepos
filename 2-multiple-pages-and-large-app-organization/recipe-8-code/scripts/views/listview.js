// views/listview.js

/*global define */

define([
	"jquery"
], function ($) {

	"use strict";

	return function () {

		this.render = function (model) {

			// Add the listview element to local memory for easy access
			var $listView = $(".ui-listview");

			// Remove all of the items from the list view
			$listView.html("");
			
			// Loop over the items in the model to create the list
			$.each(model, function () {

				// If there is a link, add it to the list element
				if (this.href) {
					$listView.append(
					  $("<li />").html($("<a />").attr("href", this.href).html(this.name))
					);

				// If there is no link, just render a list item
				} else {
					$listView.append(
						$("<li />").html(this.name)
					);
				}

			});

			// Refresh the list view
			$listView.listview("refresh");

		};

	};

});