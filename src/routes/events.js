// var express = require('express');
// var router = express.Router();
// var request = require('request');

// var url = 'https://script.google.com/macros/s/AKfycbygYiSXlhf4EtyPgYTKoW1atdOL0hZueTAP1jgPaQlYmRYFoNaU/exec';
// var requestUrl = url + '?events=true';
// var options = {
//     url: requestUrl,
//     headers: {
//         'Accept': 'application/json'
//     }
// };

// router.get('/', function (req, res, next) {

//     request(options, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             body = JSON.parse(body);
//         }

//         res.render('events', {
//             title: 'LAUX the Author',
//             events: body.events,
//             type: 'events'
//         });
//     });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
var jwtClient = require('../middleware/google');
var announcement = require('../middleware/announcement');

router.get('/', function (req, res, next) {
    let sheetName = 'Events!A2:K'
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
            const result = rows.reduce(function (prev, curr, ix) {
                var date = curr[0];
                var time = curr[1];
                var location = curr[2];
                var title = curr[3];
                var description = curr[4];
                var imageLink = curr[5];
                var linkToPurchase = curr[6];
                var icon = curr[7];
                var facebook = curr[8];
                var twitter = curr[9];
                var mail = curr[10];
                var obj = {
                    dateOfEvent: date, time: time, location: location,
                    title: title, desc: description, image: imageLink,
                    link: linkToPurchase, icon: icon, facebook: facebook,
                    twitter: twitter, mail: mail, index: ix
                };
                if (date) prev.push(obj);
                return prev;
            }, []);
            
            const getResults = async function () {
                const results = await Promise.all([announcement()]);
                const a = results[0].values.reduce(function (prev, curr) {
            
                    prev = curr[0] == "FALSE" ? false : curr[0];
            
                  return prev;
                }, '');
            
                res.render('events', { title: 'LAUX the Author', type: 'events', events: result, announcement: a });
              }
            
              getResults();

            
        }
    });
});

module.exports = router;