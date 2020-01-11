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

<<<<<<< HEAD
=======
    // $(".datepicker").datepicker({
    //     container: "body",
    //     format: "mmmm dd/yyyy",
    //     showClearBtn: false,
    //     i18n:{
    //         clear:'remove',
    //         done: 'select'

    //     }
    // })

>>>>>>> af00b442aef3f8b07cdff825029e8580c5724f67
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
var collectionItem = $('.collection-item')
var carousel = $("#card-carousel");
var currentDate = moment().format('L')
var modalContent = $('.modal-content');


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

// Display no results found if invalid search
 function displayNoResults() {
    var resultsDiv = $('#results-div');
    carousel.empty()

    collectionGroup.empty()

    var noResultsHeader = $('<h3>');
    noResultsHeader.addClass('results-header center-align');
    noResultsHeader.text('Sorry no upcoming events...')
    resultsDiv.empty()
    resultsDiv.append(noResultsHeader)
    console.log('noResultsHeader')


 }

// If search is valid display colletion of events
 function displayResults(event) {

    collectionGroup.empty()
    console.log(event)

        var resultsDiv = $('#results-div');
        var navbarSearch = $('#event-search').val().trim()
        var citySearch = $('#city-search').val().trim()
        var rowCard = $('row card-rows')

    
        var resultsHeader = $('<h3>');
        resultsHeader.addClass('results-header left-align');
        console.log(navbarSearch)
        resultsHeader.text(`Results for: ${navbarSearch}`);
        carousel.addClass("hide");
        resultsDiv.empty()
        
        resultsDiv.append(resultsHeader);
        
        // For loop to dynamically generate list with events
        for(var i = 0; i < event.length; i++) {
                //console.log(event[i].name)
                //console.log(event[i].id)     
          var collectionItem = $('<li>');
          collectionItem.addClass('collection-item');
          collectionGroup.append(collectionItem);

          var eventRow = $('<div>');
          eventRow.addClass('row')
          collectionItem.append(eventRow);

          var eventCol = $('<div>');
          eventCol.addClass('col m2')
          eventRow.append(eventCol)
          var collectionDate = $('<span>')
          collectionDate.addClass('event-date');

          var eventDate = event[i].dates.start.localDate;

          collectionDate.html(`${moment(eventDate).format('ll')}`);
          eventCol.append(collectionDate)

          var collectionTime = $('<p>');
          collectionTime.addClass('event-time');

          var standardTime = event[i].dates.start.localTime
          var timeZone = event[i].dates.timezone
          console.log(timeZone)

          collectionTime.html(`${moment(standardTime, 'HH:mm:ss').format('h:mm:ss A')} ${timeZone} Time`);
          collectionDate.append(collectionTime)

   
          var titleCol = $('<div>');
          titleCol.addClass('col m5');
          eventRow.append(titleCol);

          var eventVenue = $('<h6>');
          eventVenue.addClass('venue-header');
          eventVenue.html(`${event[i]._embedded.venues[0].name} - ${event[i]._embedded.venues[0].city.name}, ${event[i]._embedded.venues[0].state.name}`)
          titleCol.append(eventVenue);

          
          var eventTitle = $('<p>');
          eventTitle.addClass = $('event-title');
          eventTitle.html(event[i].name)
          titleCol.append(eventTitle)

          // col for details button 
          var detailsBtnCol = $('<div>');
          detailsBtnCol.addClass('col m2').on('click', 'button', function(e) {
            e.preventDefault();
            console.log('click')
            var navbarSearch= $('#navbar-search').val().trim()
            getModal()
          });
          eventRow.append(detailsBtnCol);

        // button for event details
        var detailsBtn = $('<button class="btn-large modal-trigger" data-target="modal1">')
        detailsBtn.html('Details')
        detailsBtnCol.append(detailsBtn)

          // col for tickets button 
          var ticketsBtnCol = $('<div>');
          ticketsBtnCol.addClass('col m2');
          eventRow.append(ticketsBtnCol);

        // button for event tickets
        var ticketsBtn = $(`<a href="${event[i].url}" target="_blank" class="btn-large tickets-button">`);
        ticketsBtn.html('Tickets')
        ticketsBtnCol.append(ticketsBtn)
 

        }
 }

 function modalInfo(eventInfo) {
     console.log('get some info')
     modalContent.empty()
    
    //  var navbarSearch = $('#event-search').val().trim()
    
    // for(var j = 0; eventInfo.length; j++) {
    //     var modalHeader = $('<h4 class="modal-header>');
    //     modalHeader.html("this is some words")
    //     modalContent.append(modalHeader);
    // }
  

 }

 // function to display the modal with additional event details
function getModal(searchTerm) {
    var queryUrlModal = `http://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchTerm}&${authKey}`;

    $.ajax({
        method: "GET",
        url: queryUrlModal
    }).then(function(details, info) {
        console.log(details._embedded.events)

        modalInfo(details._embedded.events)
    });
}

$(document).ready(function() {


    // Create click event function for for search input in navbar   
    $('#navbar-search').click(function(e) {
        e.preventDefault()
        console.log('click')

        // if(e.keyCode === 13) {
            var navbarSearch = $('#event-search').val().trim()
            // var citySearch = $('#city-serach').val().trim();
            // console.log(citySearch)
            console.log(navbarSearch)
            if(navbarSearch !== "") {
                getEvents(navbarSearch)
            }
        //}

    })

     // Create click event function for for search input in sidebar nav for mobile   
     $('#sidenav-search').keyup(function(e) {
        e.preventDefault()
 
        if(e.keyCode === 13) {
            var navbarSearch= $('#sidenav-search').val().trim()
            console.log(navbarSearch)
            if(navbarSearch !== "") {
                getEvents(navbarSearch)
            }
        }
    });


  

    // $("#link").on("click", function(){
    //     carouselEvents()
    // });
    // function carouselEvents () {
    //     $.ajax ({
    //         method: "GET",
    //         url: `https://app.ticketmaster.com/discovery/v2/events/images.json?size=1&${authKey}`,
    //     }).then(function(response){
    //        console.log(response)
    //        var results = response.data
    //        for (var i = 0; i > results.length; i++) {
    //            var eventDiv = $("<div>");
    //            var p = $("<p>");
    //            p.text(results[i].rating);
    //            var eventImage = $("<img>");
    //            eventImage.attr("src", results[i].images.fixed_height.url);
    //            eventDiv.append(p, eventImage);
    //            $("#modalInfo").prepend(eventDiv);
    //        }
    //     })
    // }
    
}); 

 $.getJSON("https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=PmVlmcvc5NaJ0GJLCwaEc2KY1DzDLaKv", 
    function(data){
    console.log(data);
 });
