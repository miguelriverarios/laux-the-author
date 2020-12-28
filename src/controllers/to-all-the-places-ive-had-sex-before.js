const getMinimumOptions = require('../util/getMinimumOptions');
const catchError = require('../util/catchError');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const google = require('../middleware/google');
const sheetName = 'Praise!A:C';
const pageType = 'to-all-the-places-ive-had-sex-before';

const toAllThePlacesIveHadSexBefore = async (req, res) => {
    const options = await getMinimumOptions(pageType);

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const payload = values.slice(1).reduce((prev, curr, ix, arr) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const isNotLast = ix !== arr.length - 1;
                const object = {
                    quote: row.quote, person: row.person, organization: row.organization, isNotLast: isNotLast
                };

                prev.push(object);
            }

            return prev;
        }, []);

        options.payload = payload;
        options.disableFAB = true;

        res.render(pageType, options);

    } catch (err) {
        catchError(err, sheetName);
    }
}

module.exports = toAllThePlacesIveHadSexBefore;