const getMinimumOptions = require('../util/getMinimumOptions');
const catchError = require('../util/catchError');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const google = require('../middleware/google');
const sheetName = 'Team!A:F';
const pageType = 'my-team';
const tabType = 'my-story';

const events = async (req, res) => {
    const options = await getMinimumOptions(pageType, tabType);

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const payload = values.slice(1).reduce((prev, curr, ix) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const description = row.description.split(/(?:\r\n|\r|\n)/g);
                const obj = {
                    name: row.name, title: row.title, description: description,
                    quote: row.quote, quoteAttribution: row.quoteAttribution, image: row.image,
                    ix: ix
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