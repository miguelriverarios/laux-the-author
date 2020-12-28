const getQueryParameter = require('../middleware/getQueryParameter');
const getMinimumOptions = require('../util/getMinimumOptions');
const catchError = require('../util/catchError');
const pageType = 'contact-me';
const tabType = 'my-story';

const contactMe = async (req, res) => {
    const requestType = getQueryParameter(req, "requestType");
    const options = await getMinimumOptions(pageType, tabType);

    try {
        options.requestType = requestType;

        res.render(pageType, options);

    } catch (err) {
        catchError(err, pageType);
    }

}

module.exports = contactMe;