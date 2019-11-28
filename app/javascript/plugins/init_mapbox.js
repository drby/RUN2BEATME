// import mapboxgl from 'mapbox-gl';

// if ("geolocation" in navigator) {
//         console.log("yes");
//         navigator.geolocation.getCurrentPosition(position => {
//           console.log(position);
//           const pos = position;
// });
//       } else {
//         console.log("no");
// }

// const initMapbox = () => {
//   const mapElement = document.getElementById('map');

//   if (mapElement) { // only build a map if there's a div#map to inject into
//     mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/tomdarby/ck3h7hmz70sf81cmz42fwcduc'
//     });
//   }
// };

// export { initMapbox };
import mapboxgl from 'mapbox-gl';

const mapElement = document.getElementById('map');

const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tomdarby/ck3h7hmz70sf81cmz42fwcduc'
  });
};

function getMatch(e) {
    // https://www.mapbox.com/api-documentation/#directions
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + e +'?geometries=geojson&steps=true&&access_token=pk.eyJ1IjoidG9tZGFyYnkiLCJhIjoiY2syZ2FhNm1uMHFsdTNpcGJvZjN2dmRwdiJ9.p_xq3xb9jlOwct9IlLwYqQ';
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload  = function() {
      var jsonResponse = req.response;
      var distance = jsonResponse.routes[0].distance*0.001; // convert to km
      var duration = jsonResponse.routes[0].duration/90; // convert to minutes
      // add results to info bo
      var coords = jsonResponse.routes[0].geometry;
      console.log(coords)
      // add the route to the map
      addRoute(coords);
    };
    req.send();
}
function addRoute (coords) {
  // check if the route is already loaded
  if (map.getSource('route')) {
    map.removeLayer('route')
    map.removeSource('route')
  } else{
    map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": coords
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#3b9ddd",
        "line-width": 8,
        "line-opacity": 0.8
      }
    });
  };
}


const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    getMatch( `${marker.start_lng}, ${marker.start_lat};${marker.end_lng}, ${marker.end_lat}`)
    new mapboxgl.Marker()
      .setLngLat([ marker.start_lng, marker.start_lat ])
      .addTo(map);
  });
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.start_lng, marker.start_lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
