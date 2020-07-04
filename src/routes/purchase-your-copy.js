var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
var jwtClient = require('../middleware/google');

router.get('/', function (req, res, next) {
    let sheetName = 'Purchase Your Copy!A2:G'
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
                var obj = {
                    vendor: vendor, link: linkToPage, cost: cost,
                    desc: description, orgs: supportedOrganizations,
                    order: order, rec: recommendation
                };

                if (vendor) prev.push(obj);
                return prev;
            }, []);

            res.render('purchase-your-copy', { title: 'LAUX the Author', 
            type: 'purchase-your-copy', purchase: result, disableFAB: true });
        }
    });
});

module.exports = router;