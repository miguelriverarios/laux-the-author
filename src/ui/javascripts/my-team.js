require('./vendors/jquery-global.js');

const teamDrawers = $('.team-drawer');

//////////////////
//
// Open Drawer on Mobile
//
//////////////////

if (teamDrawers.length) {
    let mdcTeamDrawer;

    $('.open-drawer-on-click').click(function () {
        const $this = $(this);
        const teamDrawer = teamDrawers.first();
        let name, title, description, quote, image;

        name = $this.find("h3").text();
        title = $this.find("h4").text();
        description = $this.find("main").html();
        quote = $this.find("footer").html();
        image = $this.find("img").attr("src");

        teamDrawer.find("h3").text(name);
        teamDrawer.find("h4").text(title);
        teamDrawer.find("main").html(description);
        teamDrawer.find("footer").html(quote);
        teamDrawer.find("img").attr("src", image);

        mdcTeamDrawer = teamDrawer[0].MDCDrawer;
        mdcTeamDrawer.open = true;

        $('body').toggleClass('hide-scroll', true);
    });

    $('.close').on('click', function () {
        mdcTeamDrawer.open = false;
        $('body').toggleClass('hide-scroll', false);
    })
}