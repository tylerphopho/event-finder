$(document).ready(function(){
    // Materialize functions
    $(".sidenav").sidenav();
    $(".slider").slider({
        indicators: false,
        height: 500,
        transition: 500,
        interval: 6000,
    })

    // $(".datepicker").datepicker({
    //     container: "body",
    //     format: "mmmm dd/yyyy",
    //     showClearBtn: false,
    //     i18n:{
    //         clear:'remove',
    //         done: 'select'

    //     }
    // })

    $("select").formSelect();

    $(".modal").modal();

    $(".carousel").carousel({
        shift: 20,
        padding: 50,
        numVisible: 10
    });
});

// variables
var collectionGroup = $('.collection');
var collectionItem = $('.collection-item')
var carousel = $("#card-carousel");
var currentDate = moment().format('L')
var modalContent = $('.modal-content');


var authKey = 'apikey=PmVlmcvc5NaJ0GJLCwaEc2KY1DzDLaKv';

function getEvents(searchTerm) {
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
          eventRow.addClass('row event-row')
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
        //   console.log(timeZone)

          collectionTime.html(`${moment(standardTime, 'HH:mm').format('h:mm A')} ${timeZone} Time`);
          eventCol.append(collectionTime)

   
          var titleCol = $('<div>');
          titleCol.addClass('col m5 middle-col');
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
            console.log(
                $(this).data('index')
                )
               
                // large array of all data
        event
                // console.log(info[j]._embedded.venues[0].location.longitude)
                // var longitude = info[j]._embedded.venues[0].location.longitude;
                // var latitude = info[j]._embedded.venues[0].location.latitude;
                // console.log(longitude, latitude)

            
            modalCall(event[$(this).data('index')].name)
                //somevar here
            var longEvent = event[$(this).data('index')]._embedded.venues[0].location.longitude;
            var latEvent = event[$(this).data('index')]._embedded.venues[0].location.latitude;
            findEvent(longEvent, latEvent);
            // [""0""]._embedded.venues[""0""].location.longitude
            console.log(longEvent);
          });
          eventRow.append(detailsBtnCol);

        // button for event details
        var detailsBtn = $('<button class="btn-large modal-trigger" data-target="modal1" data-index="' + i + '">')
        
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
 function findEvent(longitude, latitude){
    // findEvent(longitude, latitude)
    // var longitude= event[i]._embedded.venues[0].location.longitude;
    
        var queryMapAPI = 'https://image.maps.ls.hereapi.com/mia/1.6/mapview'+
        '?apiKey=OsiyIDiSxgJ3oNZHVzo-E2tc6EB4kpsp6yJApZiheIc'+
        '&lat='+ latitude +
        '&lon=' + longitude + 
        '&vt=0' +
        '&z=14'
        $('#map').attr("src", queryMapAPI); 
        console.log(queryMapAPI);

        }



 // function to display the modal with additional event details
 function modalCall(searchTerm) {
    var queryUrlBase = `http://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchTerm}&${authKey}`
    $.ajax({
        method: "GET",
        url: queryUrlBase
    }).then(function(response) {
        // console.log(response._embedded.events[0])
            modalInfo(response._embedded.events)
            console.log(response._embedded.events[1])
        
    });
 }


 function modalInfo(info) {
    $(".event-detail").empty()
    
    // console.log('some info')
    for(var j = 0; j < info.length; j++) {

        var modalHeader = $('<p class="event-date">');
        // console.log(info[j].name);      
        var modalDate = info[j].dates.start.localDate;
        modalHeader.html(`${moment(modalDate).format('ll')}`);
       $(".event-detail").append(modalHeader)

       var modalTime = $('<p class="event-time>');

       var standardTime = info[j].dates.start.localTime
       var timeZone = info[j].dates.timezone

       modalTime.html(`${moment(standardTime, 'HH:mm').format('h:mm A')} ${timeZone} Time`);
       $('.event-detail').append(modalTime)

       var modalTitle = $('<h5>');
       modalTitle.addClass = $('event-title bold');
       modalTitle.html(info[j].name)
       $('.event-detail').append(modalTitle)

    




    //  console.log(info[j]._embedded.venues[0].location.longitude)
    //  var longitude = info[j]._embedded.venues[0].location.longitude;
    //  var latitude = info[j]._embedded.venues[0].location.latitude;
    //  console.log(longitude, latitude)
    }
     
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

