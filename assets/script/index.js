$(document).ready(function(){
    $(".sidenav").sidenav();
    $(".slider").slider({
        indicators: false,
        height: 500,
        transition: 500,
        interval: 6000,
    })

    $(".datepicker").datepicker({
        format: "mmmm dd/yyyy",
        showClearBtn: true,
        i18n:{
            clear:'remove',
            done: 'select'
        }

    });
});



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

