var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
var jwtClient = require('../middleware/google');
var announcement = require('../middleware/announcement');
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
//const stripe = require('stripe')('sk_test_51H9yIQGLXd0wRqTHm9Z7Nie4WWf8Uy6BsGPzQUZ5LbncC0sOa6Z1T4jRSy2qujIsdXdNBfzmrVnvvQbHQgZFyQ7j00YnAnyvnE');
 const stripe = require('stripe')(process.env.STRIPE_SECRET);

// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ['card'],
//   line_items: [{
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: 'To All the Places I\'ve Had Sex Before',
//       },
//       unit_amount: 2000,
//     },
//     quantity: 1,
//   }],
//   mode: 'payment',
//   success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//   cancel_url: 'https://example.com/cancel',
// });


router.get('/', async function (req, res, next) {
  let sheetName = 'Purchase Your Copy!A2:H'
  let sheets = google.sheets('v4');

  sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: '1_8YPlzCSCGcnNV0Wcg1h5SISgrhw2hrLJGE6KeqK6kk',
    range: sheetName
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
    } else {
      const rows = response.data.values;
      const result = rows.reduce(function (prev, curr) {
        var vendor = curr[0];
        var linkToPage = curr[1];
        var cost = curr[2];
        var description = curr[3];
        var supportedOrganizations = curr[4];
        var order = curr[5];
        var recommendation = curr[6];
        var typeOfBook = curr[7];
        var obj = {
          vendor: vendor, link: linkToPage, cost: cost,
          desc: description, orgs: supportedOrganizations,
          order: order, rec: recommendation, typeOfBook: typeOfBook
        };

        if (vendor) prev.push(obj);
        return prev;
      }, []);

      const getResults = async function () {
        const results = await Promise.all([announcement()]);
        const a = results[0].values.reduce(function (prev, curr) {

          prev = curr[0] == "FALSE" ? false : curr[0];

          return prev;
        }, '');
        // const product1 = await stripe.products.create({
        //   name: 'To All the Places I\'ve Had Sex Before',
        // });
        // const product2 = await stripe.products.create({
        //   name: 'To All the Places I\'ve Had Sex Before - Signed',
        // });
        // const price1 = await stripe.prices.create({
        //   product: product1.id,
        //   unit_amount: 1699,
        //   currency: 'usd',
        // });
        // const price2 = await stripe.prices.create({
        //   product: product2.id,
        //   unit_amount: 3900,
        //   currency: 'usd',
        // });

        let session = {};
        /*session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'To All the Places I\'ve Had Sex Before',
              },
              unit_amount: 1699,
            },
            quantity: 1,
          }],
          mode: 'payment',
          success_url: 'https://c1d890c622cc.ngrok.io/purchase-your-copy?session_id={CHECKOUT_SESSION_ID}&status=success',
          cancel_url: 'https://c1d890c622cc.ngrok.io/purchase-your-copy?cancel-purchase=true',
        });*/

        session = !session ? {id: '123'} : session;

        res.render('purchase-your-copy', {
          title: 'LAUX the Author',
          type: 'purchase-your-copy', purchase: result, disableFAB: true, announcement: a, session_id: session.id
        });
      }

      getResults();

    }
  });
});

module.exports = router;