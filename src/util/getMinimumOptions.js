const announcements = require('../controllers/announcements');
const navigation = require('../controllers/navigation');

const getMinimumOptions = async (pageType, tabType) => {
  const announcement = await announcements();
  const tabsAndMenus = await navigation();
  let minimumOptions;

  tabType = !tabType ? pageType : tabType;

  minimumOptions = {
    title: 'LAUX the Author',
    tabType: tabType,
    type: pageType,
    announcement: announcement,
    tabsAndMenus: tabsAndMenus
  }

  return minimumOptions;
};

module.exports = getMinimumOptions;