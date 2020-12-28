// Resolves regeneratorRuntime is not defined
// https://github.com/babel/babel/issues/9849
const LoadStripe = require('@stripe/stripe-js');
require('regenerator-runtime/runtime.js');
require('./vendors/jquery-global.js');

//////////////////
//
// Open Snackbar
//
//////////////////

const snackbarPurchase = $('.mdc-snackbar--purchase-success');
if (snackbarPurchase.length) {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (status) {
        const mdcSnackbarPurchase = snackbarPurchase[0].MDCSnackbar;
        mdcSnackbarPurchase.open();
    }
}

//////////////////
//
// Redirect to Checkout
//
//////////////////

$(() => {
const checkoutButton = $('.checkout');
checkoutButton.on("click", buildCheckout);
})

const buildCheckout = async (event) => {
    const stripe = await LoadStripe.loadStripe('pk_live_51H9yIQGLXd0wRqTHdbDzsByud4STz7KD1p1xDUdbtX0jFzhFCxtL9YY52VUUooRiILEvxjNbnMpO4wJK5ALBr7vc00s0oIrqdU');
    var id = event.currentTarget.id;

    // Create a new Checkout Session using the server-side endpoint you
    // created in step 3.
    $.post('/purchase-your-copy/checkout?type=' + id)
        .then(function (response) {
            return response;
        })
        .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, you should display the localized error message to your
            // customer using `error.message`.
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}

//////////////////
//
// Highlight Rows with Rowspan
//
//////////////////

$("tbody td:not(.no-js-hover)").on('mouseenter', (event) => {
    const $this = $(event.currentTarget);
    const classes = $this.attr("class");
    const regex = /vendor-([a-zA-z-]+)/;
    const vendor = classes.match(regex)[1];
    const row = $("." + vendor).first();
    const cells = row.children();
    const siblings = $this.siblings();

    cells.eq(0).addClass("mdc-data-table-hover");
    cells.eq(1).addClass("mdc-data-table-hover");
    $this.addClass("mdc-data-table-hover");
    siblings.addClass("mdc-data-table-hover");

});

$("tbody td:not(.no-js-hover)").on('mouseleave', () => {
    $(".mdc-data-table-hover").removeClass("mdc-data-table-hover");
});