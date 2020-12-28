const catchError = require('../util/catchError');
const matrixToObjectArray = require('../util/matrixToObjectArray');
const google = require('../middleware/google');
const sheetName = 'Tabs!A:G';

const navigation = async () => {

    try {
        const data = (await google(sheetName)).data;
        const values = data.values;
        const payload = values.slice(1).reduce((prev, curr, ix) => {
            const row = matrixToObjectArray(values, curr);

            if (row) {
                const displayInNav = row.displayInNavigationBar == 'TRUE';
                const isNotLast = row.isNotLastInNavigationBar == 'TRUE';
                const parent = row.parent;
                const object = {
                    name: row.name, label: row.label,
                    link: row.link, ix: ix, icon: row.icon,
                    displayInNav: displayInNav, isNotLast: isNotLast
                };
                prev.tabs.push(object);

                if (!displayInNav && Object.keys(prev.menus).indexOf(parent) === -1) prev.menus[parent] = [object];
                else if (!displayInNav) prev.menus[parent].push(object);
            }

            return prev;
        }, { tabs: [], menus: {} });

        return payload;
    } catch (err) {
        catchError(err, sheetName);
    }

};

module.exports = navigation;