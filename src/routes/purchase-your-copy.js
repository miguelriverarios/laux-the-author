var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
var jwtClient = require('../middleware/google');
var announcement = require('../middleware/announcement');
var url = require('url');
var querystring = require('querystring');
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
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


//var amount = isSigned ? 'price_1HFTk7GLXd0wRqTHX0nDz7rb' : 'price_1HFTgNGLXd0wRqTHj1VWbTfi';


router.post('/checkout', async (req, res) => {
  let rawUrl = req.url;
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  let priceType = parsedQs.type ? parsedQs.type : '';
  let isInternational = /international/.test(priceType);
  let allowedCountries = !isInternational ? ['US']
    : ['AC','AD','AE','AF','AG','AI','AL','AM','AO','AQ','AR','AT','AU','AW','AX','AZ','BA','BB','BD','BE','BF','BG','BH','BI','BJ','BL','BM','BN','BO','BQ','BR','BS','BT','BV','BW','BY','BZ','CA','CD','CF','CG','CH','CI','CK','CL','CM','CN','CO','CR','CV','CW','CY','CZ','DE','DJ','DK','DM','DO','DZ','EC','EE','EG','EH','ER','ES','ET','FI','FJ','FK','FO','FR','GA','GB','GD','GE','GF','GG','GH','GI','GL','GM','GN','GP','GQ','GR','GS','GT','GU','GW','GY','HK','HN','HR','HT','HU','ID','IE','IL','IM','IN','IO','IQ','IS','IT','JE','JM','JO','JP','KE','KG','KH','KI','KM','KN','KR','KW','KY','KZ','LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY','MA','MC','MD','ME','MF','MG','MK','ML','MM','MN','MO','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ','NA','NC','NE','NG','NI','NL','NO','NP','NR','NU','NZ','OM','PA','PE','PF','PG','PH','PK','PL','PM','PN','PR','PS','PT','PY','QA','RE','RO','RS','RU','RW','SA','SB','SC','SE','SG','SH','SI','SJ','SK','SL','SM','SN','SO','SR','SS','ST','SV','SX','SZ','TA','TC','TD','TF','TG','TH','TJ','TK','TL','TM','TN','TO','TR','TT','TV','TW','TZ','UA','UG','UY','UZ','VA','VC','VE','VG','VN','VU','WF','WS','XK','YE','YT','ZA','ZM','ZW','ZZ'];
  var priceTypeId = /autographed-paperback/.test(priceType) && isInternational ? 'price_1HiRqmGLXd0wRqTHsB8iMSZU'
    : /autographed-paperback/.test(priceType) ? 'price_1HFTk7GLXd0wRqTHX0nDz7rb'
      : isInternational ? 'price_1HiRrDGLXd0wRqTH25SYEoIU'
        : 'price_1HFTgNGLXd0wRqTHj1VWbTfi';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceTypeId,
        quantity: 1,
      }
    ],
    mode: 'payment',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: allowedCountries
    },
    success_url: 'https://lauxtheauthor.com/purchase-your-copy?session_id={CHECKOUT_SESSION_ID}&status=success',
    cancel_url: 'https://lauxtheauthor.com/purchase-your-copy?cancel-purchase=true'
  });

  res.json({ id: session.id });
});

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

        session = !session ? { id: '123' } : session;

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