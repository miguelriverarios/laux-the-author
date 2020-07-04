$('#firstName, #lastName, #email, #type-container, #description').on('input click', function (e) {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var personalPronouns = $('#personal-pronouns').val();
    var type = $('#type').val();
    var description = $('#description').val();
    var updates = $('#updates').val();
    var requiredFieldsFilled = firstName && lastName && email
        && type && description;

    if (requiredFieldsFilled) $("#contact-btn").attr("disabled", false);
    else $("#contact-btn").attr("disabled", true);
});
