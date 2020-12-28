const getMinimumOptions = require('../util/getMinimumOptions');
const catchError = require('../util/catchError');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const google = require('../middleware/google');
const sheetName = 'Social Media!A:I';
const pageType = 'index';

const index = async (req, res) => {
    const options = await getMinimumOptions(pageType);

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const payload = values.slice(1).reduce((prev, curr) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const object = {
                    platform: row.platform.toLowerCase(),
                    usernameLink: row.usernameLink,
                    username: row.username,
                    timestamp: row.timestamp,
                    post: row.post,
                    image: row.image,
                    linkToPost: row.linkToPost,
                    isImage: row.isImage.toLowerCase() === 'true',
                    altText: row.alternateText
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

module.exports = index;