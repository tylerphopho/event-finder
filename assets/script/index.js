$(document).ready(function(){


    // Create click event function for for search input in navbar   
    $('#navbar-search').keyup(function(e) {
        e.preventDefault()

        if(e.keyCode === 13) {
            var navbarSearch = $('#navbar-search').val().trim()
            console.log(navbarSearch)
            if(navbarSearch !== "") {
                getEvents(navbarSearch)
            }
        }


    })
    // Materialize functions
    $(".sidenav").sidenav();
    $(".slider").slider({
        indicators: false,
        height: 500,
        transition: 500,
        interval: 6000,
    })

    $("select").formSelect();

    $(".modal").modal();

    $(".carousel").carousel({
        shift: 20,
        padding: 50,
        numVisible: 10
    });

    $("")
});

// variables
var collectionGroup = $('.collection');
var carousel = $("#card-carousel");


var authKey = 'apikey=PmVlmcvc5NaJ0GJLCwaEc2KY1DzDLaKv';

function getEvents(searchTerm) {
    // queryURL for Search
    var queryUrlBase = `http://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchTerm}&${authKey}`

    $.ajax({
        method: "GET",
        url: queryUrlBase
    }).then(function(response) {
        console.log(response)

        if(response.page.totalPages === 0) {
            displayNoResults()
        } else {
            displayResults(response._embedded.events)
        }

    });

 }


 function displayNoResults() {


    var resultsDiv = $('#results-div');

    var noResultsHeader = $('<h3>');
    noResultsHeader.addClass('results-header center-align');
    noResultsHeader.text('Sorry no upcoming events...')
    resultsDiv.empty()
    resultsDiv.append(noResultsHeader)
    console.log('noResultsHeader')


 }


 function displayResults(event) {

    collectionGroup.empty()

    console.log(event)



        var resultsDiv = $('#results-div');
        var navbarSearch = $('#navbar-search').val().trim()
        var rowCard = $('row card-rows')

    
        var resultsHeader = $('<h3>');
        resultsHeader.addClass('results-header left-align');
        console.log(navbarSearch)
        resultsHeader.text(`Results for: ${navbarSearch}`);
        carousel.addClass("hide");
        resultsDiv.empty()
        
        resultsDiv.append(resultsHeader);
        

        for(var i = 0; i < event.length; i++) {
                console.log(event[i].name)
                console.log(event[i].id)     
          var collectionItem = $('<li>');
          collectionItem.addClass('collection-item avatar');
          collectionGroup.append(collectionItem);

          var eventRow = $('<div>');
          eventRow.addClass('row')
          collectionItem.append(eventRow);

          var eventCol = $('<div>');
          eventCol.addClass('col s2')
          eventRow.append(eventCol)
          var collectionDate = $('<span>')
          collectionDate.addClass('event-date');
          collectionDate.html(event[i].dates.start.localDate)
          eventCol.append(collectionDate)

          var collectionTime = $('<p>');
          collectionTime.addClass('event-time');
          collectionTime.html(event[i].dates.start.localTime)
          collectionDate.append(collectionTime)

          var titleCol = $('<div>');
          titleCol.addClass('col s5')
          eventRow.append(titleCol);

          var eventVenue = $('<h6>');
          eventVenue.addClass('venue-header');
          eventVenue.html(`${event[i]._embedded.venues[0].name} - ${event[i]._embedded.venues[0].city.name}, ${event[i]._embedded.venues[0].state.name}`)
          titleCol.append(eventVenue);

          
          var eventTitle = $('<p>');
          eventTitle.addClass = $('event-title');
          eventTitle.html(event[i].name)
          titleCol.append(eventTitle)

        }
 }


 $("#link").on("click", function(){
     carouselEvents()
 });


 $.getJSON("https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=PmVlmcvc5NaJ0GJLCwaEc2KY1DzDLaKv", 
    function(data){
    console.log(data);
 });
