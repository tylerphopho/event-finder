$(document).ready(function(){
    $(".sidenav").sidenav();
    $(".slider").slider();
})



var authKey = 'apikey=PmVlmcvc5NaJ0GJLCwaEc2KY1DzDLaKv';

var queryUrlBase = 'http://app.ticketmaster.com/discovery/v1/events.json?keyword='


$(document).ready(function() {





    // Create click event function for for search input in navbar   
    $('#navbar-search').on('click', function(e) {
        e.preventDefault()

        var navbarSearch = $('#navbar-search').val().trim()
        console.log(navbarSearch)

    })
    
}); 

