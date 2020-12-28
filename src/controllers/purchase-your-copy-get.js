const getMinimumOptions = require('../util/getMinimumOptions');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const catchError = require('../util/catchError');
const google = require('../middleware/google');
const sheetName = 'Purchase Your Copy!A:N';
const pageType = 'purchase-your-copy';

const purchaseYourCopyGet = async (req, res) => {
    const options = await getMinimumOptions(pageType);

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const payload = values.slice(1).reduce((prev, curr) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const linkToPage = row.linkToPage;
                const includesShipping = row.includesShipping == "TRUE";
                const keepCellInTable = row.keepCellInTable == "TRUE";
                const isStripe = /stripe/.test(linkToPage.toLowerCase());
                const object = {
                    vendor: row.vendor, link: linkToPage, cost: row.cost,
                    description: row.description, orgs: row.supportedOrganizations,
                    order: row.order, rec: row.recommendation, typeOfBook: row.typeOfBook,
                    includesShipping: includesShipping, numDuplicates: row.numberOfDuplicates,
                    isStripe: isStripe, isFirstEntry: row.isFirstEntry, keepCellInTable: keepCellInTable,
                    vendorClass: row.vendorClass, stripeID: row.stripeId
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

module.exports = purchaseYourCopyGet;