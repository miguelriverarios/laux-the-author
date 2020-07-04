var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
var jwtClient = require('../middleware/google');

router.get(['/', '/index.html.var'], function (req, res, next) {

  //Google Sheets API
  let sheetName = 'Social Media!A2:I'
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
        var platform = curr[0]
        var username = curr[1];
        var usernameLink = curr[2];
        var timestamp = curr[3];
        var post = curr[4];
        var image = curr[5];
        var linkToPost = curr[6];
        var isImage = curr[7] == 'TRUE';
        var altText = curr[8];
        var style = isImage ? 'display:flex;align-items:center;width:15vw;' : 'width:25vw;';
        // var imageStyle = isImage ? 'border-radius:5px;' : '';
        var obj = {platform: platform, usernameLink: usernameLink,
          username: username, timestamp: timestamp, post: post, style: style,
          image: image, linkToPost: linkToPost, isImage: isImage, altText: altText
        };

        if (username) prev.push(obj);
        return prev;
      }, []);

      res.render('index', { title: 'LAUX the Author', type: 'index', socialMediaPosts: result, disableFAB: true });
    }
  });
});

module.exports = router;