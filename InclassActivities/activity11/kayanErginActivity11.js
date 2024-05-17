$(document).ready(function() {
    function createContent(value) {
        const html_element = `
            <h1>${value.title}</h1>
            <img src="${value.image}" alt="${value.title}">
            <h2>${value.month}<br>${value.speaker}</h2>
            <p>${value.text}</p>`;
        $("#content").html(html_element);
    }

    function loadContent(filename) {
        $.getJSON('json_files/' + filename + '.json', function(data) {
            createContent(data.speakers[0]);
        }).fail(function() {
            alert('Error loading ' + filename + '.json');
        });
    }

    loadContent('toobin');

    $("#toobinButton").on("click", function(event) {
        event.preventDefault();
        loadContent('toobin');
    });

    $("#sorkinButton").on("click", function(event) {
        event.preventDefault();
        loadContent('sorkin');
    });

    $("#chuaButton").on("click", function(event) {
        event.preventDefault();
        loadContent('chua');
    });

    $("#sampsonButton").on("click", function(event) {
        event.preventDefault();
        loadContent('sampson');
    });
});