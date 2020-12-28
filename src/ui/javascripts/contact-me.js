const validateFields = require('../../util/validateFields');
const submitData = require('../../util/submitData');
require('./vendors/jquery-global.js');

const contactFormFields = ['first-name', 'last-name', 'email', 'details', 'type-of-request'];
const postUrl = 'https://script.google.com/macros/s/AKfycbwLAi19nJUO2QTi4r2FYltBK2raOFe22XrIB4zXt4NwgLdKw16c3ZsOAA/exec';

//////////////////
//
// Submit/Validate Form
//
//////////////////

$('.contact-form-input').on('input click', { fields: contactFormFields, buttonClass: "contact-btn" }, validateFields);

$('#contact-form').on('submit',
    {
        formID: "contact-form",
        buttonClass: "contact-btn",
        formInputClass: "contact-form-data-input",
        postUrl: postUrl,
        postQueryParameters: "contact=true",
        snackbarClass: "mdc-snackbar--contact"
    },
    submitData
);
