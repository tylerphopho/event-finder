








map API 
to pull by longitute and latitude 
var queryMapAPI = 'https://image.maps.ls.hereapi.com/mia/1.6/mapview'+
'?apiKey=OsiyIDiSxgJ3oNZHVzo-E2tc6EB4kpsp6yJApZiheIc'+
'&lat=40.569710'+
'&lon=-111.897278' +
'&vt=0' +
'&z=14'
$('#map').attr("src", queryMapAPI);