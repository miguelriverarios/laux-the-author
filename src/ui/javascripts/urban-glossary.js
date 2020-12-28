require('./vendors/jquery-global.js');
// Not using wow_book.min.js because I wanted to incorporated
// the code in bundle.js, so merging all files manually
require('hammerjs');
require('jquery-hammerjs');
require('./vendors/modernizr.js');
require('./vendors/jquery.easing.custom.1.3.js');
require('./vendors/wow_book.js');

//////////////////
//
// Init Wowbook
//
//////////////////

const tabBarHeight = $(".mdc-tab-bar").height();
const windowHeight = $(window).height();
const height = windowHeight - tabBarHeight - 100;
var width = $(window).width();
const options = {
    width: width < 1100 ? width * 2 : width
    , height: height
    , hardcovers: true
    , deepLinking: false
    , updateBrowserURL: false
    , container: true
    , containerPadding: "10px"
    , toolbarPosition: "top"
    , flipSound: false
    , responsiveSinglePage: function (book) {
        return $("main").width() < 1100;
    }
    , centeredWhenClosed: true
    , toolbar: "first, back, next, last, zoomin, zoomout, fullscreen"
};
let initBook = width >= 400 & windowHeight >= 900 ? 3
    : width >= 400 & windowHeight >= 650 ? 2
        : width >= 400 & windowHeight >= 400 ? 1
            : 0;
initBook = 3;

$('#urban-glossary' + initBook).wowBook(options);

for (var i = 0; i < 4; i++) {
    if (i != initBook) {
        $('#urban-glossary' + i).hide();
    }
}

//////////////////
//
// Got to Page
//
//////////////////

// Will build this out when it is actually in use

//var ix = "{{ getPageIndex items word }}".split(',')[initBook];
//$('#urban-glossary' + initBook).wowBook("gotopage", ix);