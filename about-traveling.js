// green flag = lived
// blue flag = traveled
// yellow flag = visited
// default flag = current location
    
const placeLivedIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    placeTraveledIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    placeVisitedIcon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';

function initMap() {
    fetch('json/locations.json').then((response) => {
        return response.json();
    }).then((data) => {
        var options = {
            zoom: 3, // bigger -> more zoomed in
            center:{lat:data.current.coords.lat,lng:data.current.coords.lng} // my current location: Guelph, ON
        };
        var map = new google.maps.Map(document.getElementById('map'), options);
    
        var markers = [],
            continent_arr = [],
            country_arr = [];
        
        markers.push(data.current);
        for (var i in data.placesLived) {
            data.placesLived[i].iconImage = placeLivedIcon;
            markers.push(data.placesLived[i]);
        } 
        for (var i in data.placesTraveled) {
            data.placesTraveled[i].iconImage = placeTraveledIcon;
            markers.push(data.placesTraveled[i]);
        }
        for (var i in data.placesVisited) {
            data.placesVisited[i].iconImage = placeVisitedIcon;
            markers.push(data.placesVisited[i]);
        }
        for (i in markers) {
            if (!(continent_arr.includes(markers[i].continent))) continent_arr.push(markers[i].continent);
            if (!(country_arr.includes(markers[i].country))) country_arr.push(markers[i].country);
        }
    
        for (var i = 0; i < markers.length; i++) addMarker(markers[i]);
        
        function addMarker(props){
            var marker = new google.maps.Marker({
                position:props.coords,
                map:map
            });
    
            if(props.iconImage) marker.setIcon(props.iconImage);
            
            if(props.content){
                var infoWindow = new google.maps.InfoWindow({
                    content:props.content
                });
                
                marker.addListener('click', function(){
                    infoWindow.open(map, marker);
                    setTimeout(function() {
                        infoWindow.close();
                    }, 1000);
                });
            }
        }
    
        $("#continent-count").find('.num').text(continent_arr.length);
        $("#country-count").find('.num').text(country_arr.length);
        const city_num = 10 * Math.round((markers.length / 10) + 0.5);
        $("#city-count").find('.num').text(city_num + "+");
    }).catch(function (error) {
        console.log(error);
    });    
}