// green flag = lived
// blue flag = traveled
// yellow flag = visited
// default flag = current location
    
const icons = ['http://maps.google.com/mapfiles/ms/icons/green-dot.png','http://maps.google.com/mapfiles/ms/icons/blue-dot.png','http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'];

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

        for (var i = 0; i < 3; ++i) {
            if (i == 0) dataTemp = data.placesLived;
            else if (i == 1) dataTemp = data.placesTraveled;
            else dataTemp = data.placesVisited;
            dataTemp.forEach(function(l) {
                l.iconImage = icons[i];
                markers.push(l);
                if (!(continent_arr.includes(l.continent))) continent_arr.push(l.continent);
                if (!(country_arr.includes(l.country))) country_arr.push(l.country);
            });
        }

        markers.forEach(function(props) {
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
        });

        $("#continent-count").find('.num').text(continent_arr.length);
        $("#country-count").find('.num').text(country_arr.length);
        const city_num = 10 * Math.round((markers.length / 10) + 0.5);
        $("#city-count").find('.num').text(city_num + "+");
    }).catch(function (error) {
        console.log(error);
    });    
}