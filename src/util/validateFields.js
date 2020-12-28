const validateFields = (event) => {
    const fields = event.data.fields;
    const buttonClass = event.data.buttonClass;
    const isIcon = /icon/.test($("." + buttonClass).attr("class"));
    const btnDisabled = $("." + buttonClass).attr("disabled");
    let requiredFieldsCompleted = true;

    for (let field of fields) {
        const obj = $('#' + field);
        const val = obj.val() ? obj.val() : obj.text();

        requiredFieldsCompleted = !!val && true;

        if (!requiredFieldsCompleted) break;
    }

    if (requiredFieldsCompleted) {
        $("." + buttonClass).attr("disabled", false);

        if (!isIcon) {
            $("." + buttonClass).toggleClass("mdc-button--outlined", false);
            $("." + buttonClass).toggleClass("mdc-button--raised", true);
        }
    }
    else if (!btnDisabled) {
        $("." + buttonClass).attr("disabled", true);

        if (!isIcon) {
            $("." + buttonClass).toggleClass("mdc-button--outlined", true);
            $("." + buttonClass).toggleClass("mdc-button--raised", false);
        }
    }
}

module.exports = validateFields;