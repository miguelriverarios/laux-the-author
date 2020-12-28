// Using a forked version of svg-pan-zoom to correct for Chrome 74 bug:
// Unable to preventDefault inside passive event listener due to target being treated as passive
// https://github.com/ariutta/svg-pan-zoom/issues/337
const svgPanZoom = require('svg-pan-zoom');
const validateFields = require('../../util/validateFields');
const submitData = require('../../util/submitData');
const Handlebars = require('handlebars');
require('./vendors/jquery-global.js');
require('hammerjs');
require('jquery-hammerjs');

const storyFormFields = ['story', 'country', 'city-state'];
const postUrl = 'https://script.google.com/macros/s/AKfycbwLAi19nJUO2QTi4r2FYltBK2raOFe22XrIB4zXt4NwgLdKw16c3ZsOAA/exec'

//////////////////
//
// Submit/Validate Form
//
//////////////////

$('.story-form-input').on('input click', { fields: storyFormFields, buttonClass: "story-btn" }, validateFields);
$('#stories-form').on('submit',
  {
    formID: "stories-form",
    buttonClass: "story-btn",
    formInputClass: "story-form-data-input",
    postUrl: postUrl,
    postQueryParameters: "stories=false",
    dataValueName: "country-code",
    snackbarClass: "mdc-snackbar--story"
  },
  submitData
);

//////////////////
//
// Map Movements
//
//////////////////

const mapObj = $("object");

mapObj.on("load", function () {
  const countryCode = $(".countryCode").val();
  const storiesSummary = JSON.parse($(".storiesSummary").val());

  objectOnClick(countryCode, storiesSummary);
})

function objectOnClick(initCountryCode, storiesSummaryObj) {

  $("object").contents().find('#' + initCountryCode).addClass('clicked');

  if (storiesSummaryObj) {
    $("object").contents().find("path").each((ix, el) => {
      const currId = $(el).attr('id');

      if (storiesSummaryObj[currId]) {
        $(el).toggleClass('default country', true);
      }
    });
  }

  $("object").contents().find(".default:not(.clicked)").on('click', (event) => {
    const $this = $(event.currentTarget);
    const countryCode = $this.attr('id');
    const classStr = $this.attr('class');
    const isClicked = /clicked/.test(classStr);
    const cardTemplate = $("#card-template").html();

    $("object").contents().find("path").removeClass("clicked");
    if (!isClicked) $this.addClass("clicked");

    $("#previous-stories-progress").toggleClass('mdc-linear-progress--closed', false);
    $.get(postUrl + '?stories=true&countries=false&countryCode=' + countryCode, (data) => {
      const card = Handlebars.compile(cardTemplate);
      const context = { stories: data.stories };
      const compiled = card(context);

      $('#previous-stories').html(compiled);
      $("#previous-stories-progress").toggleClass('mdc-linear-progress--closed', true);
    });
  });

  $("object").contents().find(".default").on('mouseenter', (event) => {
    $(".tooltip").addClass('active');
    $(".tooltip").html($(event.currentTarget).attr('data-name'));
  })

  $("object").contents().find(".default").on('mouseleave', () => {
    $(".tooltip").removeClass('active');
  });

  //https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
  $("object").contents().find("path").on('mousemove', (event) => {

    const header = $('body > header').height();
    const firstCell = $('#first-grid-cell').outerHeight(true);
    const hero = $('.hero').outerHeight(true);
    const tooltip = $(".tooltip").outerHeight(true);
    const topPadding = ($(".mdc-layout-grid--main").outerHeight(true) - $(".mdc-layout-grid--main").height()) / 2;
    const leftPadding = ($(".mdc-layout-grid--main").outerWidth(true) - $(".mdc-layout-grid--main").width()) / 2;
    let svg = ($("#map-container").width() - $("object").contents().find("svg").width()) / 2;
    let gutter = parseInt($(".mdc-layout-grid__inner--main").css("grid-gap").split(" ")[0]);

    svg = svg < 0 ? 0 : svg;
    gutter = gutter ? gutter : 0;

    $(".tooltip").css({
      left: event.pageX + leftPadding + svg,
      top: event.pageY + header + hero + topPadding + firstCell + gutter - tooltip - 10
    });
  });

  //https://stackoverflow.com/questions/52576376/how-to-zoom-in-on-a-complex-svg-structure
  const svgImage = $("object").contents().find("svg")[0];
  const viewBox = { x: 0, y: 0, w: 2000, h: 1001 };
  svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

  const eventsHandler = {
    haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
    , init: function (options) {
      const instance = options.instance;
      let initialScale = 1;
      let pannedX = 0;
      let pannedY = 0;

      // Init Hammer
      // Listen only for pointer and touch events
      this.hammer = Hammer(options.svgElement, {
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
      })

      // Enable pinch
      this.hammer.get('pinch').set({ enable: true })

      // Handle double tap
      this.hammer.on('doubletap', function (ev) {
        instance.zoomIn()
      })

      // Handle pan
      this.hammer.on('panstart panmove', function (ev) {
        // On pan start reset panned variables
        if (ev.type === 'panstart') {
          pannedX = 0
          pannedY = 0
        }

        // Pan only the difference
        instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY })
        pannedX = ev.deltaX
        pannedY = ev.deltaY
      })

      // Handle pinch
      this.hammer.on('pinchstart pinchmove', function (ev) {
        // On pinch start remember initial zoom
        if (ev.type === 'pinchstart') {
          initialScale = instance.getZoom()
          instance.zoomAtPoint(initialScale * ev.scale, { x: ev.center.x, y: ev.center.y })
        }

        instance.zoomAtPoint(initialScale * ev.scale, { x: ev.center.x, y: ev.center.y })
      })

      // Prevent moving the page on some devices when panning over SVG
      options.svgElement.addEventListener('touchmove', function (e) { e.preventDefault(); });
    }

    , destroy: function () {
      this.hammer.destroy()
    }
  }

  // Expose to window namespace for testing purposes
  window.panZoom = svgPanZoom(svgImage, {
    zoomEnabled: true
    , controlIconsEnabled: false
    , fit: 1
    , center: 1
    , customEventsHandler: eventsHandler
  });

  $("#zoom-in").on('click', function (e) {
    e.preventDefault();

    window.panZoom.zoomIn();
  });

  $("#zoom-out").on('click', function (e) {
    e.preventDefault();

    window.panZoom.zoomOut();
  });

};