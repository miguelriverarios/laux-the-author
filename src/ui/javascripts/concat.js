import mdcAutoInit from '@material/auto-init/index';
import { MDCTabBar } from '@material/tab-bar/index';
import { MDCTab } from '@material/tab/index';
//import {MDCTabFoundation} from '@material/tab/index';
import { MDCRipple } from '@material/ripple/index';
import { MDCLinearProgress } from '@material/linear-progress/index';
import { MDCTextField } from '@material/textfield/index';
import { MDCSnackbar } from '@material/snackbar/index';
import { MDCDrawer } from "@material/drawer/index";
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { MDCDataTable } from '@material/data-table/index';
import { MDCDialog } from '@material/dialog/index';
import { MDCList } from '@material/list/index';
import { MDCChipSet } from '@material/chips/index';
import { MDCSelect } from '@material/select/index';
import { MDCMenu } from '@material/menu/index';
import { MDCSwitch } from '@material/switch/index';
// import $ from 'jquery';
// import 'jquery-ui';
// import 'jquery-simplyscroll';
// import 'slick-carousel';
// import 'booklet';
// import 'easing';
// import template from './views/index.hbs';
// import { menu } from 'material-components-web';

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
// mdcAutoInit.register('MDCTabFoundation', MDCTabFoundation);

mdcAutoInit();

// $('.content').html(template());

const successbar = $('.mdc-snackbar--success')[0].MDCSnackbar;
const errorbar = $('.mdc-snackbar--error')[0].MDCSnackbar;
let snackbar = $('.mdc-snackbar')[0].MDCSnackbar;
const drawer = $('.mdc-drawer')[0].MDCDrawer;
const topAppBar = MDCTopAppBar.attachTo($('.overflow-menu')[0]);
//const dialog = $('.mdc-dialog').length ? $('.mdc-dialog')[0].MDCDialog : '';
const tab = $('#my-story-tab');
const tabBar = $('.mdc-tab-bar');
const menu = $('#my-story-menu');
const mdcMenu = menu[0].MDCMenu;

// Needed for Hot Module Replacement
// if(typeof(module.hot) !== 'undefined') {
//     module.hot.accept() // eslint-disable-line no-undef  
//   }

//   console.log('123');

topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
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
                //        $("#btn").attr("disabled", false);
            });
    } else {
        toggleProgressBar(true);
        errorbar.open();
    }
});

$("#my-story-tab, #my-story-menu").hover(function (e) {
    var tabWidth = tab.outerWidth(true);
    var menuWidth = menu.width();
    var diffWidth = (menuWidth - tabWidth) / 2;
    var tabPositionLeft = tab.offset().left;
    var tabHeight = tabBar.height();

    mdcMenu.setAbsolutePosition(tabPositionLeft - diffWidth, tabHeight);
    mdcMenu.setFixedPosition(true);
    //menu.css("top", "52px");
    if (!mdcMenu.open) mdcMenu.open = true;

}, function (e) {
    var currentTarget = $(e.currentTarget).attr('id');
    var relatedTarget = $(e.relatedTarget).attr('id');
    var remain = (currentTarget == 'my-story-tab' && relatedTarget == 'my-story-list') || (currentTarget == 'my-story-menu' && relatedTarget == 'my-story-ripple');

    if (!remain) mdcMenu.open = false;
});

//  $('.disabled-anchor')[0].MDCTab.handleClick(function(e) {
//      e.preventDefault();
//      $(this).attr('aria-selected', 'false');
//      $(this).attr('aria-selected', 'false');
//  })

tab.click(function (e) {
    // $("#my-story-indicator").hide();
});

$('#contact-form').submit(function (event) {
    toggleProgressBar(false);
    event.preventDefault();
    $("#contact-btn").attr("disabled", true);
    var data = $('.form-input').serializeArray().reduce(function (prev, curr) {
        var key = curr.name;
        var val = curr.value;

        if (!prev[key]) prev[key] = val;

        return prev;
    }, {});
    //var country = $('li[aria-selected=true]');

    //data.countryCode = country.attr('data-value');

    $.post(url + '?contact=true',
        data, function (resp, status) {
            $('#contact-form').trigger('reset');
            toggleProgressBar(true);

            snackbar.open();
            //        $("#btn").attr("disabled", false);
        });
});

const { min } = require("d3");

var desc = $(".descriptor");
var timeouts = [1000, 2000, 3000, 4000, 5000, 6000];

desc.each(function (ix, el) {
    setTimeout(function () {
        $(el).addClass("fade-in");
    }, (ix + 1) * 1000)
});

$("#social-media-marquee").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    // autoplaySpeed: 0,
    // cssEase: 'linear',
    // speed: 10000,
    // variableWidth: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    dots: true,
    respondTo: 'min',
    responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
});
var windowHeight = $(window).height();
var initBook = windowHeight >= 900 ? 3
        : windowHeight >= 650 ? 2
        : windowHeight >= 400 ? 1
        : 0;

$("#urban-glossary" + initBook).bind("bookletstart", function (event, data) {
    if (data.index !== 0) $("#look-inside").hide();
    $("#urban-glossary" + initBook).addClass("page-turning");
});

$("#book-container").mousemove(function (e) {
    var pageControlsHeight = $("#page-controls-container").height();
    var tabBarHeight = $(".mdc-tab-bar").height();
    var glossaryHeight = $("#urban-glossary" + initBook).height();
    var book = $(this).children("#urban-glossary" + initBook);
    var pages = book.children();
    var firstPage = pages.eq(2);
    var isOnCover = !firstPage.attr('class') ? false
            : firstPage.attr('class').indexOf('ui-draggable') !== -1;

    if (e.pageY >= pageControlsHeight + tabBarHeight && e.pageY <= pageControlsHeight + tabBarHeight + glossaryHeight) {
        
        var isTurning = !book.attr('class') ? false
            : book.attr('class').indexOf('page-turning') !== -1;
        
        var cover = pages.eq(1);
        
        
        var min = $(window).width() * 0.75 - 100;
        var max = $(window).width() * 0.75;

        if (isOnCover && !isTurning) {
            if (e.pageX >= min && e.pageX <= max) $("#look-inside").fadeOut(500);
            else {
                // console.log(2);
                $("#look-inside").fadeIn(500);
            }
        }
    } else if (isOnCover) {
        // console.log(1);
        $("#look-inside").fadeIn(500);
    }
});

$("#urban-glossary" + initBook).bind("bookletchange", function (event, data) {
    if (data.index === 0) $("#look-inside").show();
    else $("#look-inside").hide();
    $("#urban-glossary" + initBook).removeClass("page-turning");
});

$(".b-selector.b-selector-page ul li").click(function() {
    $(".b-selector.b-selector-page ul").slideUp();
})
// $("#look-inside").css("right", $(window).width() / 4 + 15 + 'px');
$('#firstName, #lastName, #email, #type-container, #description').on('input click', function (e) {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var personalPronouns = $('#personal-pronouns').val();
    var type = $('#type').val();
    var description = $('#description').val();
    var updates = $('#updates').val();
    var requiredFieldsFilled = firstName && lastName && email
        && type && description;

    if (requiredFieldsFilled) $("#contact-btn").attr("disabled", false);
    else $("#contact-btn").attr("disabled", true);
});

// import mdcAutoInit from '@material/auto-init/index';
// import { MDCSnackbar } from '@material/snackbar/index';
// mdcAutoInit.register('MDCSnackbar', MDCSnackbar);
// mdcAutoInit();
//snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar--story'));
const snackbarStory = $('.mdc-snackbar--story');

if (snackbarStory.length) {
  const mdcSnackbarStory = snackbarStory[0].MDCSnackbar;

  $('#storiesForm').submit(function (event) {
    event.preventDefault();
    toggleProgressBar(false);
    $("#btn").attr("disabled", true);
    var data = $('.form-input').serializeArray().reduce(function (prev, curr) {
      var key = curr.name;
      var val = curr.value;

      if (!prev[key]) prev[key] = val;

      return prev;
    }, {});
    var country = $('li[aria-selected=true]');

    data.countryCode = country.attr('data-value');

    $.post(url + '?stories=false',
      data, function (resp, status) {
        $('#storiesForm').trigger('reset');
        toggleProgressBar(true);
        mdcSnackbarStory.open();
      });
  });

  $('#story, #cityState, #countrySelect').on('input click', function (e) {
    var story = $('#story').val();
    var cityState = $('#cityState').val();
    var country = $('#country').val();

    if (story && cityState && country) $("#btn").attr("disabled", false);
    else $("#btn").attr("disabled", true);
  });
}
 const teamDrawers = $('.mdc-drawer-team');
// const teamDrawerAttach = MDCTopAppBar.attachTo($('.overflow-menu')[0]);

if (teamDrawers.length) {
    // const teamDrawer = $('.mdc-drawer-team');
    let mdcTeamDrawer;

    $('.team-card').click(function () {
        let id = $(this).attr('id');
        let teamDrawer = $('#' + id + 'Drawer');
        mdcTeamDrawer = teamDrawer[0].MDCDrawer;
        mdcTeamDrawer.open = true;

        $('body').toggleClass('hide-scroll', true);
    });

    $('.team-drawer-close').click(function () {
        mdcTeamDrawer.open = false;
        $('body').toggleClass('hide-scroll', false);
    })
    // topAppBar.listen('MDCTopAppBar:nav', () => {
        // mdcTeamDrawer.open = !mdcTeamDrawer.open;
    // });
}
const eventCards = $('.mdc-card.events');
// const teamDrawerAttach = MDCTopAppBar.attachTo($('.overflow-menu')[0]);

if (eventCards.length) {
    // const teamDrawer = $('.mdc-drawer-team');
    let mdcEventDialog;

    $('.share-button').click(function () {
        console.log($(this).attr('id'));
        let id = $(this).attr('id').substr(-1);
        console.log('#' + 'dialog' + id);
        let eventDialog = $('#' + 'dialog' + id);
        mdcEventDialog = eventDialog[0].MDCDialog;
        mdcEventDialog.open();
    });

    $('.dialog-close').click(function () {
        mdcEventDialog.close();
    })
}
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
    $("#content").hide();
    toggleProgressBar(true);
    $("#content").show();

    if(Cookies.get("hide-announcement-banner") != "true") $("#announcement-banner:not(.permaHide)").slideDown();

    if ($(window).width() > 1100) {
        $("#purchase-fab").addClass("mdc-fab--extended");
        $("#purchase-fab .mdc-fab__label").show();
    } else {
        $("#purchase-fab").removeClass("mdc-fab--extended");
        $("#purchase-fab .mdc-fab__label").hide();
    }

    $(window).on('resize',function() {
        var width = $(window).width();

        if (width < 1100) {
            $("#purchase-fab").removeClass("mdc-fab--extended");
            $("#purchase-fab .mdc-fab__label").hide();
        } else {
            $("#purchase-fab").addClass("mdc-fab--extended");
            $("#purchase-fab .mdc-fab__label").show();
        }
    })
});

