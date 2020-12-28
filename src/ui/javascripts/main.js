const { mdcAutoInit } = require('@material/auto-init');
const { MDCTabBar } = require('@material/tab-bar');
const { MDCTab } = require('@material/tab');
const { MDCRipple } = require('@material/ripple');
const { MDCLinearProgress } = require('@material/linear-progress');
const { MDCTextField } = require('@material/textfield');
const { MDCSnackbar } = require('@material/snackbar');
const { MDCDrawer } = require('@material/drawer');
const { MDCTopAppBar } = require('@material/top-app-bar');
const { MDCDataTable } = require('@material/data-table');
const { MDCDialog } = require('@material/dialog');
const { MDCList } = require('@material/list');
const { MDCChipSet } = require('@material/chips');
const { MDCSelect } = require('@material/select');
const { MDCMenu } = require('@material/menu');
const { MDCSwitch } = require('@material/switch');
const Cookies = require('js-cookie');
const validateFields = require('../../util/validateFields');
const submitData = require('../../util/submitData');
const toggleProgressBar = require('../../util/toggleProgressBar');
require('./vendors/jquery-global.js');

//////////////////
//
// Init MDC
//
//////////////////

mdcAutoInit.register('MDCRipple', MDCRipple);
mdcAutoInit.register('MDCTabBar', MDCTabBar);
mdcAutoInit.register('MDCLinearProgress', MDCLinearProgress);
mdcAutoInit.register('MDCTextField', MDCTextField);
mdcAutoInit.register('MDCSnackbar', MDCSnackbar);
mdcAutoInit.register('MDCDrawer', MDCDrawer);
mdcAutoInit.register('MDCDataTable', MDCDataTable);
mdcAutoInit.register('MDCDialog', MDCDialog);
mdcAutoInit.register('MDCList', MDCList);
mdcAutoInit.register('MDCChipSet', MDCChipSet);
mdcAutoInit.register('MDCSelect', MDCSelect);
mdcAutoInit.register('MDCMenu', MDCMenu);
mdcAutoInit.register('MDCSwitch', MDCSwitch);
mdcAutoInit.register('MDCTab', MDCTab);

mdcAutoInit();

//////////////////
//
// Init Navigation
//
//////////////////

const drawer = $('.mdc-drawer')[0].MDCDrawer;
const topAppBar = MDCTopAppBar.attachTo($('.overflow-menu')[0]);

topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});

//////////////////
//
// Tab Bar Menu
//
//////////////////

const tab = $('#my-story-tab');
const header = $('body > header');
const menu = $('#my-story-menu');
const mdcMenu = menu[0].MDCMenu;

$("#my-story-tab, #my-story-menu").on('mouseenter', () => {
    const tabWidth = tab.outerWidth(true);
    const tabPositionLeft = tab.offset().left;
    const headerHeight = header.height();

    menu.css("width", tabWidth);
    mdcMenu.setAbsolutePosition(tabPositionLeft, headerHeight);
    mdcMenu.setFixedPosition(true);
    if (!mdcMenu.open) mdcMenu.open = true;

})

$("#my-story-tab, #my-story-menu").on('mouseleave', (event) => {
    const currentTarget = $(event.currentTarget).attr('id');
    const relatedTarget = $(event.relatedTarget).attr('id');
    const remain = (currentTarget == 'my-story-tab' && relatedTarget == 'my-story-list') || (currentTarget == 'my-story-menu' && relatedTarget == 'my-story-ripple');

    if (!remain) mdcMenu.open = false;
});

//////////////////
//
// Scroll Effects
//
//////////////////

$(window).on('scroll', () => {
    const scroll = $(window).scrollTop();
    const splashFab = $("#splash-fab");
    const purchaseFab = $("#purchase-fab");

    if (scroll >= 1) {
        $("body > header, .menu-navigation").addClass("tab-bar-scroll");
    } else {
        $("body > header, .menu-navigation").removeClass("tab-bar-scroll");
    }

    if (splashFab.length) {
        var splashFabTop = splashFab.position().top;
        if (scroll >= splashFabTop) purchaseFab.removeClass("mdc-fab--exited");
        else purchaseFab.addClass("mdc-fab--exited");
    }
});

//////////////////
//
// Submit/Validate Form
//
//////////////////

const subscriptionFormFields = ['first-name-subscribe', 'last-name-subscribe', 'email-subscribe'];
const postUrl = 'https://script.google.com/macros/s/AKfycbwLAi19nJUO2QTi4r2FYltBK2raOFe22XrIB4zXt4NwgLdKw16c3ZsOAA/exec';

$('.subscription-form-input').on('input click', { fields: subscriptionFormFields, buttonClass: "subscribe-btn" }, validateFields);
$('#subscription-form').on('submit',
    {
        formID: "subscription-form",
        buttonClass: "subscribe-btn",
        formInputClass: "subscription-form-input",
        postUrl: postUrl,
        postQueryParameters: "subscriptions=true",
        snackbarClass: "mdc-snackbar--success"
    },
    submitData
);

//////////////////
//
// Open/Close Announcement
//
//////////////////

$("#announcement-banner > .close").on('click', () => {
    $("#announcement-banner").slideUp();
    $("#announcement-banner > .close").slideUp();

    Cookies.set("hide-announcement-banner", "true", { path: '/' });
});

//////////////////
//
// Activate Progress Bar
//
//////////////////

$('.progress-bar-click').on('click', () => {
    toggleProgressBar(false);
});

//////////////////
//
// Document Ready
//
//////////////////

$(() => {

    //////////////////
    //
    // Show Announcement If No Cookie
    //
    //////////////////

    if (Cookies.get("hide-announcement-banner") != "true") $("#announcement-banner:not(.permaHide)").slideDown();

    //////////////////
    //
    // Purchase FAB Width
    //
    //////////////////

    // Init FAB width
    if ($(window).width() > 1100) {
        $("#purchase-fab").addClass("mdc-fab--extended");
        $("#purchase-fab .mdc-fab__label").show();
    } else {
        $("#purchase-fab").removeClass("mdc-fab--extended");
        $("#purchase-fab .mdc-fab__label").hide();
    }

    // Adjust FAB width on resize
    $(window).on('resize', () => {
        var width = $(window).width();

        if (width < 1100) {
            $("#purchase-fab").removeClass("mdc-fab--extended");
            $("#purchase-fab .mdc-fab__label").hide();
        } else {
            $("#purchase-fab").addClass("mdc-fab--extended");
            $("#purchase-fab .mdc-fab__label").show();
        }
    })

    toggleProgressBar(true);
    $("#loading-overlay").fadeOut();
})