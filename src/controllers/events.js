const getMinimumOptions = require('../util/getMinimumOptions');
const catchError = require('../util/catchError');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const google = require('../middleware/google');
const sheetName = 'Events!A:L';
const pageType = 'events';

const events = async (req, res) => {
    const options = await getMinimumOptions(pageType);

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const payload = values.slice(1).reduce((prev, curr, ix) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const obj = {
                    dateOfEvent: row.date, time: row.time, location: row.location,
                    title: row.title, desc: row.description, image: row.imageLink,
                    link: row.linkToPurchase, icon: row.icon, facebook: row.facebook,
                    twitter: row.twitter, mail: row.mail, index: ix, linkToEvent: row.linkToEvent
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