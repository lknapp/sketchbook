var map, hoveredMarkerIcon, markerIcon, infoWindows, markers, styles, createContent;

infoWindows = [];
markers = [];

createContent = (bird) => {
  return "<div>" + bird.description+ ", found on " + bird.date + " at " + bird.time + ", " + bird.status + ".</div>";
}

function initMap() {

  markerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      strokeColor: 'black',
      strokeWeight: 3
  };

  hoveredMarkerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillOpacity: 1.0,
      strokeWeight: 3
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 41.886817, lng: -87.626264 },
    zoom: 16,
    mapTypeControl: false,
    zoomControl: false,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  });

  styles = [
    {
      stylers: [{ saturation: -100 }]
    },
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ];

  birds.forEach((bird, i) => {
    infoWindows[i] = new google.maps.InfoWindow({
      content: createContent(bird)
    });

    markers[i] = new google.maps.Marker({
      position: { lat: bird.lat, lng: bird.lng },
      map: map,
      title: bird.species,
      icon: markerIcon,
      active: false
    });

    markers[i].addListener('click', function () {
      infoWindows.forEach(infoWindow => { infoWindow.close() });
      infoWindows[i].open(map, markers[i]);
      markers.forEach(marker => { marker.setIcon(markerIcon) });
      markers[i].setIcon(hoveredMarkerIcon);
      markers[i].active = true;
    });

    google.maps.event.addListener(markers[i], 'mouseover', function() {
          markers[i].setIcon(hoveredMarkerIcon);
    });
    google.maps.event.addListener(markers[i], 'mouseout', function() {
      if (!markers[i].active) {
          markers[i].setIcon(markerIcon);
      }
    });
  });

  map.setOptions({ styles: styles });
};
