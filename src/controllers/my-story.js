const getMinimumOptions = require('../util/getMinimumOptions');
const pageType = 'my-story';

const myStory = async (req, res) => {
    const options = await getMinimumOptions(pageType);

    try {
        res.render(pageType, options);
    } catch (err) {
        catchError(err, pageType);
    }
}

module.exports = myStory;