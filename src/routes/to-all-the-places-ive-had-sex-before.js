var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
var jwtClient = require('../middleware/google');

router.get('/', function (req, res, next) {
    let sheetName = 'Praise!A2:C'
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
                var quote = curr[0];
                var person = curr[1];
                var organization = curr[2];
                var obj = {
                    quote: quote, person: person, organization: organization
                };

                if (quote) prev.push(obj);
                return prev;
            }, []);

            res.render('to-all-the-places-ive-had-sex-before', { title: 'LAUX the Author', 
            type: 'to-all-the-places-ive-had-sex-before', praise: result, disableFAB: true  });
        }
    });
});

module.exports = router;