const catchError = require('../util/catchError');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const google = require('../middleware/google');
const sheetName = 'Banner!A:D';

const announcements = async () => {

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const payload = values.slice(1).reduce((prev, curr) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const announcement = row.message;
                const date = new Date(row.disappearsOnDate);
                const isAfterToday = date > new Date();
                const object = {
                    announcement: announcement, linkText: row.linkText,
                    link: row.link, isAfterToday: isAfterToday
                };
                
                if (announcement && isAfterToday) prev = object;
            }

            return prev;
        }, {});

        return Object.keys(payload).length ? payload : false;
    } catch (err) {
        catchError(err, sheetName);
    }

};

module.exports = announcements;