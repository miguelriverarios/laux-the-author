const { google } = require('googleapis');
let sheets = google.sheets('v4');
var jwtClient = require('./google');

const getRequest = function (sheetName) {
    return { auth: jwtClient, spreadsheetId: '1_8YPlzCSCGcnNV0Wcg1h5SISgrhw2hrLJGE6KeqK6kk', range: sheetName };
}

const announcement = async function () {
    let request = getRequest('Banner!A2');
    let response = (await sheets.spreadsheets.values.get(request)).data;

    return response;
};

module.exports = announcement;