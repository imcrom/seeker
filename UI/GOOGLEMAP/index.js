
function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    
    var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
  });
  var infoWindow = new google.maps.InfoWindow();
  directionsRenderer.setMap(map);
  
  window.addEventListener("load", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          

            // Draw user's current location
            const currentLoc = new google.maps.Marker({
                position: pos,
                map: map,
                zoom: 90,   

            });

            const dest = {lat: 14.65947440623992, lng: 121.02471327085954};
            const destination = new google.maps.Marker({
              position: dest,
              map: map,
            });
            
            var request = {
                origin: pos,
                destination: dest,
                travelMode: 'DRIVING'
              };
              directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                  directionsRenderer.setDirections(result);
                }
              });

          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;