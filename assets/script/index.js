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
    })

    $("select").formSelect();

    $(".modal").modal();
});



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

