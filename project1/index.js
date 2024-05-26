$(document).ready(function() {
    // Form validation and submission
    if ($("#contact-form").length > 0) {
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

    if ($('.image-slider').length > 0) {
        $('.image-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: false,
            arrows: true
        });
    
        var slideCount = $('.image-slider').slick('getSlick').slideCount;
        for (var i = 0; i < slideCount; i++) {
            var dot = $('<div class="custom-dot"></div>');
            dot.attr('data-slide', i);
            $('.custom-dots-container').append(dot);
        }
    
        $('.custom-dot').click(function() {
            var slideIndex = $(this).attr('data-slide');
            $('.image-slider').slick('slickGoTo', slideIndex);
        });
    
        $('.image-slider').on('afterChange', function(event, slick, currentSlide){
            $('.custom-dot').removeClass('active');
            $('.custom-dot[data-slide="'+currentSlide+'"]').addClass('active');
        });
    }
    

    // Load and display content from data.json
    function createBlogItem(val, containerId, blogClass) {
        var item = `<div class="${blogClass}"><h3>${val.title}</h3><img class="blog-img" src="${val.image}" alt="${val.title}"><div class="content"><p class="shortText">${val.content.substring(0, 100)}...</p><p class="fullText">${val.content}</p><a class="toggleButton">Read More/Less</a><div class='rating'></div></div></div>`;
        $(containerId).append(item);
    }

    function initiateRatings() {
        if ($.fn.rateYo) {
            $('.rating').rateYo({
                fullStar: true,
                onSet: function(rating, rateYoInstance) {
                    console.log(`Rating set to ${rating}`);
                }
            });
        } else {
            console.error("rateYo plugin is not loaded.");
        }
    }

     // Fetching random quotes from Quotable API
     $.ajax({
        url: 'https://api.quotable.io/random',
        method: 'GET',
        success: function(data) {
            const quoteHtml = `
                <div class="quote-content">
                    <p class="quote-text">"${data.content}"</p>
                    <p class="quote-author">- ${data.author}</p>
                </div>
            `;
            $('#quote').html(quoteHtml);
        },
        error: function(error) {
            console.error('Error fetching quote', error);
        }
    });

    $.getJSON('data.json', function(data) {
        function processCategory(category, containerId, blogClass) {
            $.each(data[category], function(key, val) {
                createBlogItem(val, containerId, blogClass);
            });
        }

        // Featured Content
        var allPosts = [];
        $.each(data, function(category, posts) {
            allPosts = allPosts.concat(posts);
        });
        allPosts = allPosts.sort(() => 0.5 - Math.random()).slice(0, 3); // Shuffle and take 3 random posts
        $.each(allPosts, function(index, post) {
            var featuredItem = `<div class="featured-item"><img src="${post.image}" alt="${post.title}"><h3>${post.title}</h3><p>${post.content.substring(0, 100)}...</p><a href="blog.html?id=${post.id}">Read More</a></div>`;
            $('.featured-slider').append(featuredItem);
        });

        processCategory('LanguageLearning', '#language-learning-container','lan-learn-blog');
        processCategory('LearningEnvironment', '#learning-environment-container', 'lear-env-blog');
        processCategory('PersonalReflections', '#personal-reflections-container', 'pers-ref-blog');

        initiateRatings();

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

    if ($('#date').length > 0) {
        $('#date').datepicker({
            maxDate: "+30d"
        });
    }

    if ($('#reservationForm').length > 0) {
        $('#reservationForm').submit(function(e) {
            e.preventDefault();

            var name = $('#name').val();
            var email = $('#email').val();
            var date = $('#date').val();
            var time = $('#time').val();

            alert('Reservation successfully submitted!');
            $('#reservationForm')[0].reset();
        });
    }

    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('nav ul');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active'); // Toggle the burger icon
        });
    } else {
        console.error("Burger menu or nav links not found.");
    }
    if ($(".image-gallery").length > 0){
        lightbox.option({
            'resizeDuration': 200, // Geçiş süresi
            'wrapAround': true,    // Galeri sonunda başa dönme
            'showImageNumberLabel': false, // Görsel numaralarını gizleme
            'alwaysShowNavOnTouchDevices': true // Dokunmatik cihazlarda navigasyonu sürekli gösterme
        });
    }
});
