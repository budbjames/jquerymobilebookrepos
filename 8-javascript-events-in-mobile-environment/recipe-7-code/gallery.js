// gallery.js

$("div[data-role=gallery]").each(function () {

    // The $img represents all of the images in the gallery
    var $img = $(this).children("img"),
        $gallery = $(this),
        $current = $(this).children("img").first();

    // Swipe Left
    $(this).bind("swipeleft", function () {

        // If there is no next slide, the next slide is the first image element
        var $next = $current.next();
        if (!$next.length) {
            $next = $img.first();
        }

        // Use the jQuery Mobile transitions to animate to the next slide
        $.mobile.transitionHandlers.default($gallery.data("transition") || "slide", false, $next, $current);

        // Set the slide we just animated to as the current slide
        $current = $next;

    });

    // Swipe Right
    $(this).bind("swiperight", function () {

        // If there is no previous slide, the previous slide is the last image element
        var $prev = $current.prev();
        if (!$prev.length) {
            $prev = $img.last();
        }

        // Use jQuery Mobile transitions to animate to the previous slide
        $.mobile.transitionHandlers.default($gallery.data("transition") || "slide", true, $prev, $current);

        // Set the slide we just transitioned to as the current slide
        $current = $prev;

     });

    // Set the first slide as active
    $current.addClass("ui-page-active");

});