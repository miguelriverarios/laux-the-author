var url = 'https://script.google.com/macros/s/AKfycbygYiSXlhf4EtyPgYTKoW1atdOL0hZueTAP1jgPaQlYmRYFoNaU/exec';

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var splashFab = $("#splash-fab");
    var purchaseFab = $("#purchase-fab");

    if (scroll >= 1) {
        $(".mdc-tab-bar, .mdc-menu-my-story").addClass("tab-bar-scroll");
        // $(".default-tab-color").toggleClass("default-tab-color default-text-scroll");
        // $(".mdc-tab-bar .tab-bar-icon").toggleClass('tab-bar-icon default-icon');
        // $("#logo").attr("src", "../../images/LAUX-TheAuthor-white.png");
        // $("#logo").addClass("white-logo");
        // $(".my-story-menu-item.default-link").addClass("tab-bar-scroll-text");
    } else {
        $(".mdc-tab-bar, .mdc-menu-my-story").removeClass("tab-bar-scroll");
        // $(".default-text-scroll").toggleClass("default-tab-color default-text-scroll");
        // $(".mdc-tab-bar .default-icon").toggleClass('tab-bar-icon default-icon');
        // $("#logo").attr("src", "../../images/LAUX-TheAuthor.png");
        // $("#logo").removeClass("white-logo");
        // $(".my-story-menu-item.default-link").removeClass("tab-bar-scroll-text");
    }

    if (splashFab.length) {
        var splashFabTop = splashFab.position().top;
    if (scroll >= splashFabTop) purchaseFab.removeClass("mdc-fab--exited");
    else purchaseFab.addClass("mdc-fab--exited");
    }
});

$("#logo-container").hover(function(e) {
    $(".white-logo").attr('src', '../../images/LAUX-TheAuthor-red.png');
}, function(e) {
    $(".white-logo").attr('src', '../../images/LAUX-TheAuthor-white.png');
})

$('.mdc-snackbar__dismiss').click(function (event) {
    event.preventDefault();
});

$('#subscribe').click(function (event) {
    toggleProgressBar(false);
    event.preventDefault();
    $("#btn").attr("disabled", true);
    var numMissing = 0;
    var data = $('.subscribe').serializeArray().reduce(function (prev, curr) {
        var key = curr.name;
        var val = curr.value;

        if (!prev[key]) prev[key] = val;

        if (!val) numMissing++;

        return prev;
    }, {});

    if (!numMissing) {
        $.post(url + '?subscriptions=true',
            data, function (resp, status) {
                $('#subscription-form').trigger('reset');
                toggleProgressBar(true);
                successbar.open();
            });
    } else {
        toggleProgressBar(true);
        errorbar.open();
    }
});

function toggleProgressBar(isClosed) {
    $("#main-progress-bar").toggleClass('mdc-linear-progress--closed', isClosed);
}

$('.progress-bar-click').click(function(e) {
    toggleProgressBar(false);
});

$(document).ready(function () {
    toggleProgressBar(true);

    if(Cookies.get("hide-announcement-banner") != "true") $("#announcement-banner:not(.permaHide)").slideDown();
});

