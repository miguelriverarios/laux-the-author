const toggleProgressBar = function(isClosed) {
    $("#main-progress-bar").toggleClass('mdc-linear-progress--closed', isClosed);
}

module.exports = toggleProgressBar;