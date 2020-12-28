const getQueryParameter = require('../middleware/getQueryParameter');
const getMinimumOptions = require('../util/getMinimumOptions');
const catchError = require('../util/catchError');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const google = require('../middleware/google');
const sheetName = 'Urban Glossary!A:E';
const pageType = 'urban-glossary';

const index = async (req, res) => {
    const word = getQueryParameter(req, "word");
    const options = await getMinimumOptions(pageType);

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const items = values.slice(1).reduce((prev, curr) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const object = {
                    word: row.term,
                    stress: row.stress,
                    pronounciation: row.pronounciation,
                    type: row.type,
                    definition: row.definition
                };

                prev.push(object);
            }

            return prev;
        }, []);
        const payload = { word: word, items: items };

        options.payload = payload;
        options.disableFAB = true;

        res.render(pageType, options);

    } catch (err) {
        catchError(err, sheetName);
    }
}

module.exports = index;