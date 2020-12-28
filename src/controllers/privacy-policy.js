const getMinimumOptions = require('../util/getMinimumOptions');
const pageType = 'privacy-policy';

const privacyPolicy = async (req, res) => {
    const options = await getMinimumOptions(pageType);

    try {
        res.render(pageType, options);
    } catch (err) {
        catchError(err, pageType);
    }
}

module.exports = privacyPolicy;