const eventCards = $('.mdc-card.events');
// const teamDrawerAttach = MDCTopAppBar.attachTo($('.overflow-menu')[0]);

if (eventCards.length) {
    // const teamDrawer = $('.mdc-drawer-team');
    let mdcEventDialog;

    $('.share-button').click(function () {
        console.log($(this).attr('id'));
        let id = $(this).attr('id').substr(-1);
        console.log('#' + 'dialog' + id);
        let eventDialog = $('#' + 'dialog' + id);
        mdcEventDialog = eventDialog[0].MDCDialog;
        mdcEventDialog.open();
    });

    $('.dialog-close').click(function () {
        mdcEventDialog.close();
    })
}