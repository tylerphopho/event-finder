// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
//   });

//   // Or with jQuery

//   $(document).ready(function(){
//     $('.modal').modal();
//   });
          

// var longitude = (grab the longitude from ticketmaster then set the &lon= longitude)
// var latitude = (grab the latitude from tiketmaster then set the &lat= latitude)
var latitude= "40.569710";
var longitude="-111.897278";

findEvent(longitude, latitude );


function findEvent(longitude, latitude){



var queryMapAPI = 'https://image.maps.ls.hereapi.com/mia/1.6/mapview'+
'?apiKey=OsiyIDiSxgJ3oNZHVzo-E2tc6EB4kpsp6yJApZiheIc'+
'&lat='+ latitude +
'&lon=' + longitude + 
'&vt=0' +
'&z=14'
$('#map').attr("src", queryMapAPI); 

}

// $.ajax({
//         method: "GET", 
//         url: queryMapAPI 
        
// }) .then(function (response)
// {console.log(response)});
