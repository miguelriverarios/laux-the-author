var countries = {
  "AD": "Andorra", "AE": "United Arab Emirates", "AF": "Afghanistan",
  "AG": "Antigua and Barbuda", "AI": "Anguilla", "AL": "Albania",
  "AM": "Armenia", "AO": "Angola", "AQ": "Antarctica", "AR": "Argentina",
  "AT": "Austria", "AU": "Australia*", "AW": "Aruba", "AX": "Aland Islands",
  "AZ": "Azerbaijan", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "BD": "Bangladesh",
  "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BH": "Bahrain", "BI": "Burundi",
  "BJ": "Benin", "BL": "Saint Barthélemy", "BM": "Bermuda", "BN": "Brunei Darussalam",
  "BO": "Bolivia, Plurinational State of", "BQ": "Bonaire, Sint Eustatius and Saba",
  "BR": "Brazil*", "BS": "Bahamas", "BT": "Bhutan", "BV": "Bouvet Island", "BW": "Botswana",
  "BY": "Belarus", "BZ": "Belize", "CA": "Canada*", "CC": "Cocos (Keeling) Islands",
  "CD": "Congo, the Democratic Republic of the", "CF": "Central African Republic",
  "CG": "Congo", "CH": "Switzerland", "CI": "Cote d’Ivoire", "CK": "Cook Islands",
  "CL": "Chile", "CM": "Cameroon", "CN": "China*", "CO": "Colombia", "CR": "Costa Rica",
  "CU": "Cuba", "CV": "Cape Verde", "CW": "Curaçao", "CX": "Christmas Island", "CY": "Cyprus",
  "CZ": "Czech Republic", "DE": "Germany", "DJ": "Djibouti", "DK": "Denmark",
  "DM": "Dominica", "DO": "Dominican Republic", "DZ": "Algeria", "EC": "Ecuador",
  "EE": "Estonia", "EG": "Egypt", "EH": "Western Sahara", "ER": "Eritrea", "ES": "Spain",
  "ET": "Ethiopia", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands (Malvinas)",
  "FO": "Faroe Islands", "FR": "France", "GA": "Gabon", "GB": "United Kingdom", "GD": "Grenada",
  "GE": "Georgia", "GF": "French Guiana", "GG": "Guernsey", "GH": "Ghana", "GI": "Gibraltar",
  "GL": "Greenland", "GM": "Gambia", "GN": "Guinea", "GP": "Guadeloupe", "GQ": "Equatorial Guinea",
  "GR": "Greece", "GS": "South Georgia and the South Sandwich Islands", "GT": "Guatemala",
  "GW": "Guinea-Bissau", "GY": "Guyana", "HM": "Heard Island and McDonald Islands",
  "HN": "Honduras", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "ID": "Indonesia",
  "IE": "Ireland*", "IL": "Israel", "IM": "Isle of Man", "IN": "India*",
  "IO": "British Indian Ocean Territory", "IQ": "Iraq", "IR": "Iran, Islamic Republic of",
  "IS": "Iceland", "IT": "Italy*", "JE": "Jersey", "JM": "Jamaica", "JO": "Jordan", "JP": "Japan",
  "KE": "Kenya", "KG": "Kyrgyzstan", "KH": "Cambodia", "KI": "Kiribati", "KM": "Comoros",
  "KN": "Saint Kitts and Nevis", "KP": "Korea, Democratic People’s Republic of",
  "KR": "Korea, Republic of", "KW": "Kuwait", "KY": "Cayman Islands", "KZ": "Kazakhstan",
  "LA": "Lao People’s Democratic Republic", "LB": "Lebanon", "LC": "Saint Lucia",
  "LI": "Liechtenstein", "LK": "Sri Lanka", "LR": "Liberia", "LS": "Lesotho", "LT": "Lithuania",
  "LU": "Luxembourg", "LV": "Latvia", "LY": "Libyan Arab Jamahiriya", "MA": "Morocco",
  "MC": "Monaco", "MD": "Moldova, Republic of", "ME": "Montenegro",
  "MF": "Saint Martin (French part)", "MG": "Madagascar",
  "MK": "Macedonia, the former Yugoslav Republic of", "ML": "Mali", "MM": "Myanmar",
  "MN": "Mongolia", "MO": "Macao", "MQ": "Martinique", "MR": "Mauritania",
  "MS": "Montserrat", "MT": "Malta", "MU": "Mauritius", "MV": "Maldives", "MW": "Malawi",
  "MX": "Mexico*", "MY": "Malaysia", "MZ": "Mozambique", "NA": "Namibia", "NC": "New Caledonia",
  "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NI": "Nicaragua", "NL": "Netherlands",
  "NO": "Norway", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "NZ": "New Zealand", "OM": "Oman",
  "PA": "Panama", "PE": "Peru", "PF": "French Polynesia", "PG": "Papua New Guinea",
  "PH": "Philippines", "PK": "Pakistan", "PL": "Poland", "PM": "Saint Pierre and Miquelon",
  "PN": "Pitcairn", "PS": "Palestine", "PT": "Portugal", "PY": "Paraguay", "QA": "Qatar",
  "RE": "Reunion", "RO": "Romania", "RS": "Serbia", "RU": "Russian Federation",
  "RW": "Rwanda", "SA": "Saudi Arabia", "SB": "Solomon Islands", "SC": "Seychelles",
  "SD": "Sudan", "SE": "Sweden", "SG": "Singapore",
  "SH": "Saint Helena, Ascension and Tristan da Cunha", "SI": "Slovenia",
  "SJ": "Svalbard and Jan Mayen", "SK": "Slovakia", "SL": "Sierra Leone",
  "SM": "San Marino", "SN": "Senegal", "SO": "Somalia", "SR": "Suriname", "SS": "South Sudan",
  "ST": "Sao Tome and Principe", "SV": "El Salvador", "SX": "Sint Maarten (Dutch part)",
  "SY": "Syrian Arab Republic", "SZ": "Swaziland", "TC": "Turks and Caicos Islands",
  "TD": "Chad", "TF": "French Southern Territories", "TG": "Togo", "TH": "Thailand",
  "TJ": "Tajikistan", "TK": "Tokelau", "TL": "Timor-Leste", "TM": "Turkmenistan",
  "TN": "Tunisia", "TO": "Tonga", "TR": "Turkey", "TT": "Trinidad and Tobago",
  "TV": "Tuvalu", "TW": "Taiwan", "TZ": "Tanzania, United Republic of", "UA": "Ukraine",
  "UG": "Uganda", "US": "United States*", "UY": "Uruguay", "UZ": "Uzbekistan",
  "VA": "Holy See (Vatican City State)", "VC": "Saint Vincent and the Grenadines",
  "VE": "Venezuela, Bolivarian Republic of", "VG": "Virgin Islands, British",
  "VN": "Vietnam", "VU": "Vanuatu", "WF": "Wallis and Futuna", "WS": "Samoa",
  "YE": "Yemen", "YT": "Mayotte", "ZA": "South Africa", "ZM": "Zambia", "ZW": "Zimbabwe"
};

var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
var jwtClient = require('../middleware/google');
var url = require('url');
var querystring = require('querystring');
const randomKey = function (obj) {
  var keys = Object.keys(obj);

  return keys[keys.length * Math.random() << 0];
}

router.get('/', function (req, res, next) {
  let rawUrl = req.url;
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  let countryCode = parsedQs.countryCode ? parsedQs.countryCode : '';
  let sheets = google.sheets('v4');

  const getRequest = function (sheetName) {
    return { auth: jwtClient, spreadsheetId: '1_8YPlzCSCGcnNV0Wcg1h5SISgrhw2hrLJGE6KeqK6kk', range: sheetName };
  }

  const getCountries = async function () {
    let request = getRequest('Geography!A2:B');
    let response = (await sheets.spreadsheets.values.get(request)).data;

    return response;
  };

  const getStories = async function () {
    let request = getRequest('Stories!A2:F');
    let response = (await sheets.spreadsheets.values.get(request)).data;

    return response;
  };

  const getStoriesSummary = async function () {
    let request = getRequest('Stories Summary!A2:C');
    let response = (await sheets.spreadsheets.values.get(request)).data;

    return response;
  };

  const getResults = async function () {
    const results = await Promise.all([getCountries(), getStories(), getStoriesSummary()]);
    const storiesSummary = results[2].values.reduce(function (prev, curr) {
      var code = curr[0];
      var name = curr[1];
      var count = curr[2];

      if (code != '' && !prev[code]) prev[code] = { 'countryCode': code, 'count': count, 'country': name };

      return prev;
    }, {});
    const countries = results[0].values.reduce(function (prev, curr) {
      var code = curr[0];
      var country = curr[1];

      if (!prev[code]) prev[code] = country;

      return prev;
    }, {});
    const randomCountryCode = randomKey(storiesSummary);
    let countryCode = randomCountryCode ? randomCountryCode : countryCode;
    const stories = results[1].values.reduce(function (prev, curr) {
      var timestamp = curr[0];
      var code = curr[1];
      var story = curr[3];
      var cityState = curr[4];
      var approved = curr[5];
      var obj;

      if (approved == 'YES' && code == countryCode) {
        obj = {
          'timestamp': timestamp,
          'countryCode': code,
          'story': story,
          'cityState': cityState
        };

        prev.push(obj);
      }

      return prev;
    }, []);

    res.render('our-story', {
      title: 'LAUX the Author',
      countries: countries,
      stories: stories,
      countryCode: countryCode,
      storiesSummary: storiesSummary,
      type: 'our-story'
    });
  }

  getResults();

});

module.exports = router;