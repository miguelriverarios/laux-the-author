 const teamDrawers = $('.mdc-drawer-team');
// const teamDrawerAttach = MDCTopAppBar.attachTo($('.overflow-menu')[0]);

if (teamDrawers.length) {
    // const teamDrawer = $('.mdc-drawer-team');
    let mdcTeamDrawer;

    $('.team-card').click(function () {
        let id = $(this).attr('id');
        let teamDrawer = $('#' + id + 'Drawer');
        mdcTeamDrawer = teamDrawer[0].MDCDrawer;
        mdcTeamDrawer.open = true;
    });

    $('.team-drawer-close').click(function () {
        mdcTeamDrawer.open = false;
    })
    // topAppBar.listen('MDCTopAppBar:nav', () => {
        // mdcTeamDrawer.open = !mdcTeamDrawer.open;
    // });
}