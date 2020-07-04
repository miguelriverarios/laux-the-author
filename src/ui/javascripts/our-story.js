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