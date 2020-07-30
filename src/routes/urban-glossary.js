var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
const { google } = require('googleapis');
var jwtClient = require('../middleware/google');
var announcement = require('../middleware/announcement');

router.get('/', function (req, res, next) {
    let rawUrl = req.url;
    let parsedUrl = url.parse(rawUrl);
    let parsedQs = querystring.parse(parsedUrl.query);
    let word = parsedQs.word ? parsedQs.word : '';
    let sheetName = 'Urban Glossary!A2:E'
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
                var word = curr[0];
                var stress = curr[1];
                var pronounciation = curr[2];
                var type = curr[3];
                var definition = curr[4];
                var obj = {
                    word: word, stress: stress, pronounciation: pronounciation,
                    type: type, definition: definition
                };

                if (word) prev.push(obj);
                return prev;
            }, []);

            const getResults = async function () {
                const results = await Promise.all([announcement()]);
                const a = results[0].values.reduce(function (prev, curr) {
            
                    prev = curr[0] == "FALSE" ? false : curr[0];
            
                  return prev;
                }, '');
            
                res.render('urban-glossary', { title: 'LAUX the Author', type: 'urban-glossary', items: result, word: word, announcement: a });
              }
            
              getResults();
            
        }
    });
});

module.exports = router;