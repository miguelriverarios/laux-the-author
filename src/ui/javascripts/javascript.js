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
