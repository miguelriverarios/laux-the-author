const toggleProgressBar = require('./toggleProgressBar');
const submitData = (event) => {
    event.preventDefault();
    toggleProgressBar(false);

    const formID = event.data.formID;
    const buttonClass = event.data.buttonClass;
    const formInputClass = event.data.formInputClass;
    const postUrl = event.data.postUrl;
    const postQueryParameters = event.data.postQueryParameters;
    const dataValueName = event.data.dataValueName;
    const snackbarClass = event.data.snackbarClass;
    let data = {};
    let mdcSnackbar;

    $("." + buttonClass).attr("disabled", true);
    $.each($('.' + formInputClass), (ix, element) => {
        const el = $(element);
        const key = el.attr("name");
        const type = el.attr("type");
        const val = type == "checkbox" ? el.prop("checked")
        : el.val() ? el.val() 
        : el.text();

        if (!data[key]) data[key] = val;

        return data;
    });

    if (dataValueName) {
        const selectedItem = $('li[aria-selected=true]');

        data[dataValueName] = selectedItem.attr('data-value');
    }
    
    $.post(postUrl + "?" + postQueryParameters,
        data, (resp, status) => {
            const switches = $(".mdc-switch");
            mdcSnackbar = $('.' + snackbarClass)[0].MDCSnackbar;

            $('#' + formID).trigger('reset');
            $(".mdc-select__selected-text").text("");
            if (switches.length) switches[0].MDCSwitch.checked = false;

            toggleProgressBar(true);
            mdcSnackbar.open();
        }
    );
}

module.exports = submitData;