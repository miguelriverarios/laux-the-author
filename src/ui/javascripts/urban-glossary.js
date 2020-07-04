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

// $("#look-inside").css("right", $(window).width() / 4 + 15 + 'px');