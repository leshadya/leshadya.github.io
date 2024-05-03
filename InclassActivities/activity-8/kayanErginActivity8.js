// Selin Ergin 22050111075 - Hasan Kayan 18050111055

$(document).ready(function() {
    $( "#birthday" ).datepicker();

    let programmingLanguages = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python"
    ];

    $( "#PL" ).autocomplete({
    source: programmingLanguages
    });
});


