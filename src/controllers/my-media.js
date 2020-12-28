const getMinimumOptions = require('../util/getMinimumOptions');
const catchError = require('../util/catchError');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const google = require('../middleware/google');
const sheetName = 'Media!A:G';
const pageType = 'my-media';

const events = async (req, res) => {
    const options = await getMinimumOptions(pageType);

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const payload = values.slice(1).reduce((prev, curr, ix) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const description = curr[4].split(/(?:\r\n|\r|\n)/g);
                const fromDate = row.fromDate;
                const toDate = row.toDateOptional;
                const dateRange = toDate ? fromDate + ' to ' + toDate : fromDate;
                const obj = {
                    link: row.link, image: row.image, imageTag: row.imageTagLine,
                    alternateText: row.alternateText, description: description,
                    dateRange: dateRange
                };
                prev.push(obj);
            }

            return prev;
        }, []);

        options.payload = payload;

        res.render(pageType, options);

    } catch (err) {
        catchError(err, sheetName);
    }
}

module.exports = events;