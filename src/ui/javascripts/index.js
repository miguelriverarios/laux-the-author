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