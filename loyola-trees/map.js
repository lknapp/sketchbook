var map, hoveredMarkerIcon, markerIcon, infoWindows, markers, styles, createContent;

infoWindows = [];
markers = [];

createContent = (tree) => {
  return "<div>TREE INFO</div>";
}

function initMap() {

  markerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      strokeColor: 'green',
      strokeWeight: 3
  };

  hoveredMarkerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillOpacity: 1.0,
      strokeWeight: 3
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 42.0093739, lng: -87.6543734},
    zoom: 16,
    mapTypeControl: false,
    zoomControl: false,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  });

  styles = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ];

  trees.forEach((tree, i) => {
    infoWindows[i] = new google.maps.InfoWindow({
      content: createContent(tree)
    });

    markers[i] = new google.maps.Marker({
      position: { lat: tree.lat, lng: tree.lng },
      map: map,
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
