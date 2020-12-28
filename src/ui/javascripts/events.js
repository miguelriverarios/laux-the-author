require('./vendors/jquery-global.js');

const eventCards = $('.shareable');
const dialogBox = $("#share-events-dialog")
const copyToClipboard = (text) => {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).on('select');
    document.execCommand("copy");
    $temp.remove();
}

//////////////////
//
// Open Share Dialog
//
//////////////////

if (eventCards.length) {
    let mdcDialog;

    $('.material-icons-share').on('click', (event) => {
        const $this = $(event.currentTarget);
        const socialLinks = $this.siblings().first();
        let facebook, twitter, mail, clipboard;

        facebook = socialLinks.children(".facebook").val();
        twitter = socialLinks.children(".twitter").val();
        mail = socialLinks.children(".mail").val();
        clipboard = socialLinks.children(".clipboard").val();

        dialogBox.find("#facebook").on('click', () => { window.location.href = facebook; });
        dialogBox.find("#twitter").on('click', () => { window.location.href = twitter; });
        dialogBox.find("#mail").on('click', () => { window.location.href = mail; });
        dialogBox.find("#clipboard").on('click', () => { copyToClipboard(clipboard); });

        mdcDialog = dialogBox[0].MDCDialog;
        mdcDialog.open();
    });

    $('.dialog-close').on('click', () => {
        mdcDialog.close();
    })
}