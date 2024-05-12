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
    $(document).ready(function() {

        function createBlogItem(val, containerId, blogClass) {
            var item = `<div class="${blogClass}"><h3>${val.title}</h3><img class="blog-img" src="${val.image}" alt="${val.title}"><div class="content"><p class="shortText">${val.content.substring(0, 100)}...</p><p class="fullText" style="display:none;">${val.content}</p><button class="toggleButton">Read More/Less</button><div class='rating'></div></div></div>`;
            $(containerId).append(item);
        }
        

        function initiateRatings() {
            $('.rating').rateYo({
                fullStar: true,
                onSet: function(rating, rateYoInstance) {
                    console.log(`Rating set to ${rating}`);
                }
            });
        }

        $.getJSON('data.json', function(data) {

            
    
            // Process and display each category of data
            function processCategory(category, containerId,blogClass) {
                $.each(data[category], function(key, val) {
                    createBlogItem(val, containerId, blogClass);
                });
            }
    
            // Process each category
            processCategory('LanguageLearning', '#language-learning-container','lan-learn-blog');
            processCategory('LearningEnvironment', '#learning-environment-container', 'lear-env-blog');
            processCategory('PersonalReflections', '#personal-reflections-container', 'pers-ref-blog');

            initiateRatings();
    
            // Toggle button functionality
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
        $('#date').datepicker({
            maxDate: "+30d"
        }); 
    
        $('#reservationForm').submit(function(e) {
            e.preventDefault(); 
    
            
            var name = $('#name').val();
            var email = $('#email').val();
            var date = $('#date').val();
            var time = $('#time').val();
    
            alert('Reservation successfully submitted!');
            $('#reservationForm')[0].reset(); 
        });
    });
    
});
