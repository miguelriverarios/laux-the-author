const snackbarPurchase = $('.mdc-snackbar--purchase-success');
// console.log(snackbarPurchase);
if (snackbarPurchase.length) {
const params = new URLSearchParams(window.location.search);
const status = params.get('status');
// console.log(status);
if (status) {
    const mdcSnackbarPurchase = snackbarPurchase[0].MDCSnackbar;
    mdcSnackbarPurchase.open();
}
}