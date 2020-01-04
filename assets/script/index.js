$(document).ready(function(){
    $(".sidenav").sidenav();
    $(".slider").slider();
})



var authKey = 'apikey=PmVlmcvc5NaJ0GJLCwaEc2KY1DzDLaKv';




function getEvents(searchTerm) {
    var queryUrlBase = `http://app.ticketmaster.com/discovery/v1/events.json?keyword=${searchTerm}&${authKey}`

    $.ajax({
        method: "GET",
        url: queryUrlBase
    }).then(function(response) {
        console.log(response)
    });


 }

$(document).ready(function() {





    // Create click event function for for search input in navbar   
    $('#navbar-search').on('click', function(e) {
        e.preventDefault()

        var navbarSearch = $('#navbar-search').val().trim()
        getEvents('madonna')

    })
    
}); 

