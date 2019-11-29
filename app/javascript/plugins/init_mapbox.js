import mapboxgl from 'mapbox-gl';

const initMapbox = () => {
const mapElement = document.getElementById('map');

// const buildMap = () => {
//   mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
//   return new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/tomdarby/ck3h7hmz70sf81cmz42fwcduc'
//   });
// };

// function getMatch(e) {
//     // https://www.mapbox.com/api-documentation/#directions
//     var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + e +'?geometries=geojson&steps=true&&access_token=pk.eyJ1IjoidG9tZGFyYnkiLCJhIjoiY2syZ2FhNm1uMHFsdTNpcGJvZjN2dmRwdiJ9.p_xq3xb9jlOwct9IlLwYqQ';
//     var req = new XMLHttpRequest();
//     req.responseType = 'json';
//     req.open('GET', url, true);
//     req.onload  = function() {
//       var jsonResponse = req.response;
//       var distance = jsonResponse.routes[0].distance*0.001; // convert to km
//       var duration = jsonResponse.routes[0].duration/90; // convert to minutes
//       // add results to info bo
//       var coords = jsonResponse.routes[0].geometry;
//       console.log(coords)
//       // add the route to the map
//       addRoute(coords);
//     };
//     req.send();
// }
// function addRoute (coords) {
//   // check if the route is already loaded
//   if (map.getSource('route')) {
//     map.removeLayer('route')
//     map.removeSource('route')
//   } else{
//     map.addLayer({
//       "id": "route",
//       "type": "line",
//       "source": {
//         "type": "geojson",
//         "data": {
//           "type": "Feature",
//           "properties": {},
//           "geometry": coords
//         }
//       },
//       "layout": {
//         "line-join": "round",
//         "line-cap": "round"
//       },
//       "paint": {
//         "line-color": "#3b9ddd",
//         "line-width": 8,
//         "line-opacity": 0.8
//       }
//     });
//   };
// }


// const addMarkersToMap = (map, markers) => {
//   markers.forEach((marker) => {
//     getMatch( `${marker.start_lng}, ${marker.start_lat};${marker.end_lng}, ${marker.end_lat}`)
//     new mapboxgl.Marker()
//       .setLngLat([ marker.start_lng, marker.start_lat ])
//       .addTo(map);
//   });
// };

// const fitMapToMarkers = (map, markers) => {
//   const bounds = new mapboxgl.LngLatBounds();
//   markers.forEach(marker => bounds.extend([ marker.start_lng, marker.start_lat ]));
//   map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
// };

// const initMapbox = () => {
//   if (mapElement) {
//     const map = buildMap();
//     const markers = JSON.parse(mapElement.dataset.markers);
//     addMarkersToMap(map, markers);
//     fitMapToMarkers(map, markers);
//   }
// };

// export { initMapbox };

mapboxgl.accessToken = 'pk.eyJ1IjoidG9tZGFyYnkiLCJhIjoiY2syZ2FhNm1uMHFsdTNpcGJvZjN2dmRwdiJ9.p_xq3xb9jlOwct9IlLwYqQ';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v9', //hosted style id
  center: [-0.565418, 44.8594844], // starting position
  zoom: 13, // starting zoom
  minZoom: 11 // keep it local
});
//
var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    line_string: true,
    trash: true
  },
  styles: [
    {
      "id": "gl-draw-line",
      "type": "line",
      "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#3b9ddd",
        "line-dasharray": [0.2, 2],
        "line-width": 4,
        "line-opacity": 0.7
      }
    },
    // vertex point halos
    {
      "id": "gl-draw-polygon-and-line-vertex-halo-active",
      "type": "circle",
      "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
      "paint": {
        "circle-radius": 10,
        "circle-color": "#FFF"
      }
    },
    // vertex points
    {
      "id": "gl-draw-polygon-and-line-vertex-active",
      "type": "circle",
      "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
      "paint": {
        "circle-radius": 6,
        "circle-color": "#3b9ddd",
      }
    },
  ]
});
function updateRoute() {
  removeRoute(); // overwrite any existing layers
  var data = draw.getAll();
  var lastFeature = data.features.length - 1;
  var coords = data.features[lastFeature].geometry.coordinates;
  var newCoords = coords.join(';')
  getMatch(newCoords);
}
function getMatch(e) {
    // https://www.mapbox.com/api-documentation/#directions
    var url = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + e +'?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
    console.log(url)
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload  = function() {
      var jsonResponse = req.response;
      var distance = jsonResponse.routes[0].distance*0.001; // convert to km
      var duration = jsonResponse.routes[0].duration/60; // convert to minutes
      // add results to info box
      // document.getElementById('calculated-line').innerHTML = 'Distance: ' + distance.toFixed(2) + ' km<br>Duration: ' + duration.toFixed(2) + ' minutes';
      var coords = jsonResponse.routes[0].geometry;
      console.log(coords);
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
      },
      "route": {
        "distance": 5
      }
    });
  };
}

const init_coords = JSON.parse(mapElement.dataset.markers)
getMatch([`${init_coords.start_lat}, ${init_coords.start_lng};${init_coords.end_lat}, ${init_coords.end_lng}`])
// add the draw tool to the map
// map.addControl(draw);
map.on('draw.create', updateRoute);
// map.on('draw.update', updateRoute);
// map.on('draw.delete', removeRoute);
}

 export { initMapbox };
