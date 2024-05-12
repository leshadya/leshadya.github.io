$(document).ready(function() {
    // Kontrol edin: Form sayfada mevcut mu?
    if ($("#contact-form").length > 0) {
        // Form submission handling with validation
        $("#contact-form").validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    email: true
                },
                message: "required"
            },
            messages: {
                name: "Please enter your name",
                email: "Please enter a valid email address",
                message: "Please enter a message"
            },
            submitHandler: function(form) {
                event.preventDefault();
                $("#messageArea").text("Your form has been submitted successfully!").css('color', 'green');
            }
        });
    }

    // Diğer ortak işlevler
    // Initialize the slick slider if it exists on the page
    if ($('.image-slider').length > 0) {
        $('.image-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true,
            arrows: true
        });
    }

    // Load and display content from data.json
    $.getJSON('data.json', function(data) {
        // Populate language learning container
        $.each(data.LanguageLearning, function(key, val) {
            var item = '<div class="lan-learn-blog"><h3>' + val.title + '</h3><img class="blog-img" src="' + val.image + '" alt="' + val.title + '"><div class="content"><p class="shortText">' + val.content.substring(0, 100) + '...</p><p class="fullText" style="display:none;">' + val.content + '</p><button class="toggleButton">Read More/Less</button></div>';
            $('#language-learning-container').append(item);
        });

        // Handle Learning Environment data
        $.each(data.LearningEnvironment, function(key, val) {
            var item = '<div class="lear-env-blog"><h3>' + val.title + '</h3><img class="blog-img" src="' + val.image + '" alt="' + val.title + '"><div class="content"><p class="shortText">' + val.content.substring(0, 100) + '...</p><p class="fullText" style="display:none;">' + val.content + '</p><button class="toggleButton">Read More/Less</button></div>';
            $('#learning-environment-container').append(item);
        });

        // Handle Personal Reflections data
        $.each(data.PersonalReflections, function(key, val) {
            var item = '<div class="pers-ref-blog"><h3>' + val.title + '</h3><img class="blog-img" src="' + val.image + '" alt="' + val.title + '"><div class="content"><p class="shortText">' + val.content.substring(0, 100) + '...</p><p class="fullText" style="display:none;">' + val.content + '</p><button class="toggleButton">Read More/Less</button></div>';
            $('#personal-reflections-container').append(item);
        });


        $('.toggleButton').on('click', function() {
            var fullText = $(this).siblings('.fullText');
            var shortText = $(this).siblings('.shortText');
            if (fullText.css('display') === 'none') {
                fullText.css('display', 'block');
                shortText.css('display', 'none');
            } else {
                fullText.css('display', 'none');
                shortText.css('display', 'block');
            }
        });
    });
});
