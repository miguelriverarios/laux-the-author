const { google } = require('googleapis');
const sheets = google.sheets('v4');
const jwtClient = require('./jwtClient');
const spID = '1_8YPlzCSCGcnNV0Wcg1h5SISgrhw2hrLJGE6KeqK6kk';

const googleConnection = (sheetName) => {
    return sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: spID,
        range: sheetName
    });
}

module.exports = googleConnection;