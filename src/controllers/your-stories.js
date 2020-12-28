const getQueryParameter = require('../middleware/getQueryParameter');
const getMinimumOptions = require('../util/getMinimumOptions');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const catchError = require('../util/catchError');
const randomKey = require('../util/randomKey');
const staticCountries = require('../util/countries');
const google = require('../middleware/google');
const pageType = 'your-stories';

const yourStories = async (req, res) => {
    const options = await getMinimumOptions(pageType);
    let countryCode = getQueryParameter(req, "countryCode");

    try {
        let countries = (await google('Geography!A:B')).data.values.reduce((prev, curr, ix, arr) => {
            const row = matrixToObjectArray(arr, curr);

            if (row) {
                const code = row.countryCode;
                const object = {
                    code: code,
                    country: row.country
                };

                if (!prev[code] && code != 'Country Code') prev[code] = object;
            }

            return prev;
        }, {});
        const storiesSummary = (await google('Stories Summary!A:C')).data.values.reduce((prev, curr, ix, arr) => {
            const row = matrixToObjectArray(arr, curr);

            if (row) {
                const code = row.countryCode;
                const object = {
                    code: code,
                    name: row.country,
                    count: row.count
                };

                if (!prev[code] && code != 'Country Code') prev[code] = object;
            }

            return prev;
        }, {});
        const randomCountryCode = randomKey(storiesSummary);

        countryCode = randomCountryCode ? randomCountryCode : countryCode;

        const stories = (await google('Stories!A:F')).data.values.reduce((prev, curr, ix, arr) => {
            const row = matrixToObjectArray(arr, curr);
            
            if (row) {
                const approved = row.approvedForWebsite;
                const object = {
                    timestamp: row.timestamp,
                    code: row.countryCode,
                    country: row.country,
                    story: row.story.split(/(?:\r\n|\r|\n)/g),
                    cityState: row.cityState
                };

                if (approved == 'YES' && row.countryCode == countryCode) prev.push(object);
            }

            return prev;
        }, []);
        let payload;

        countries = Object.keys(countries).length ? countries : staticCountries;
        payload = {
            countryCode: countryCode,
            countries: countries,
            storiesSummary: storiesSummary,
            stories: stories
        }

        options.payload = payload;

        res.render(pageType, options);

    } catch (err) {
        catchError(err, pageType);
    }

}

module.exports = yourStories;