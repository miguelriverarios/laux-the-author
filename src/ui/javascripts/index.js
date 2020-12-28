require('./vendors/jquery-global.js');
require('slick-carousel');

//////////////////
//
// Landing Page
//
//////////////////

const desc = $(".descriptor");
const timeoutRate = 750;

desc.each((ix, el) => {
  setTimeout(() => {
    $(el).addClass("fade-in");
  }, (ix + 1) * timeoutRate)
});

//////////////////
//
// Social Media Marquee
//
//////////////////

$("#social-media-marquee").slick({
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true,
  arrows: false,
  dots: true,
  infinite: true,
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