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

// mapboxgl.accessToken = 'pk.eyJ1IjoidG9tZGFyYnkiLCJhIjoiY2syZ2FhNm1uMHFsdTNpcGJvZjN2dmRwdiJ9.p_xq3xb9jlOwct9IlLwYqQ';
// var map = new mapboxgl.Map({
//   container: 'map', // container id
//   style: 'mapbox://styles/tomdarby/ck3h7hmz70sf81cmz42fwcduc', //hosted style id
//   center: [-0.565418, 44.8594844], // starting position
//   zoom: 13, // starting zoom
//   minZoom: 1 // keep it local
// });
// //
// var draw = new MapboxDraw({
//   displayControlsDefault: false,
//   controls: {
//     line_string: true,
//     trash: true
//   },
//   styles: [
//     {
//       "id": "gl-draw-line",
//       "type": "line",
//       "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
//       "layout": {
//         "line-cap": "round",
//         "line-join": "round"
//       },
//       "paint": {
//         "line-color": "#3b9ddd",
//         "line-dasharray": [0.2, 2],
//         "line-width": 4,
//         "line-opacity": 0.7
//       }
//     },
//     // vertex point halos
//     {
//       "id": "gl-draw-polygon-and-line-vertex-halo-active",
//       "type": "circle",
//       "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
//       "paint": {
//         "circle-radius": 10,
//         "circle-color": "#FFF"
//       }
//     },
//     // vertex points
//     {
//       "id": "gl-draw-polygon-and-line-vertex-active",
//       "type": "circle",
//       "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
//       "paint": {
//         "circle-radius": 6,
//         "circle-color": "#3b9ddd",
//       }
//     },
//   ]
// });
// function updateRoute() {
//   removeRoute(); // overwrite any existing layers
//   var data = draw.getAll();
//   var lastFeature = data.features.length - 1;
//   var coords = data.features[lastFeature].geometry.coordinates;
//   var newCoords = coords.join(';')
//   getMatch(newCoords);
// }
// function getMatch(e) {
//     // https://www.mapbox.com/api-documentation/#directions
//     console.log(e)
//     var url = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + e +'?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
//     console.log(url)
//     var req = new XMLHttpRequest();
//     req.responseType = 'json';
//     req.open('GET', url, true);
//     req.onload  = function() {
//       var jsonResponse = req.response;
//       var distance = jsonResponse.routes[0].distance*0.001; // convert to km
//       var duration = jsonResponse.routes[0].duration/60; // convert to minutes
//       // add results to info box
//       // document.getElementById('calculated-line').innerHTML = 'Distance: ' + distance.toFixed(2) + ' km<br>Duration: ' + duration.toFixed(2) + ' minutes';
//       var coords = jsonResponse.routes[0].geometry;
//       console.log(coords);
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
//       },
//       "route": {
//         "distance": 5
//       }
//     });
//   };
// }

// const init_coords = JSON.parse(mapElement.dataset.markers)
// getMatch([`${init_coords.start_lat}, ${init_coords.start_lng};${init_coords.end_lat}, ${init_coords.end_lng}`])
// // add the draw tool to the map
// // map.addControl(draw);
// map.on('draw.create', updateRoute);
// map.on('draw.update', updateRoute);
// // map.on('draw.delete', removeRoute);

// // const initMapbox = () => {
//   // if (mapElement) {
//   //   const map = buildMap();
//   //   const markers = JSON.parse(mapElement.dataset.markers);
//   //   addMarkersToMap(map, markers);
//   //   fitMapToMarkers(map, markers);
//   //   console.log(markers)
//   // }
// };

  const init_coords = JSON.parse(mapElement.dataset.markers)

  mapboxgl.accessToken = 'pk.eyJ1IjoidG9tZGFyYnkiLCJhIjoiY2syZ2FhNm1uMHFsdTNpcGJvZjN2dmRwdiJ9.p_xq3xb9jlOwct9IlLwYqQ';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/tomdarby/ck3h7hmz70sf81cmz42fwcduc', //hosted style id
    center: [init_coords.start_lng, init_coords.start_lat], // starting position
    zoom: 13, // starting zoom
    minZoom: 1 // keep it local
  });
  var size = 150;
  var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    // get rendering context for the map canvas when layer is added to the map
    onAdd: function() {
      var canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },
    // called once before every frame where the icon will be used
    render: function() {
      var duration = 2000;
      var t = (performance.now() % duration) / duration;
      var radius = (size / 2) * 0.3;
      var outerRadius = (size / 2) * 0.7 * t + radius;
      var context = this.context;
      // draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = "rgba(355, 80, 80," + (1 - t) + ")";
      context.fill();
      // draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(355, 80, 80, 0.8)";
      context.strokeStyle = "#CC2936";
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();
      // update this image's data with data from the canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;
      // continuously repaint the map, resulting in the smooth animation of the dot
      map.triggerRepaint();
      // return `true` to let the map know that the image was updated
      return true;
    }
  };
  map.on("load", function() {
    // map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
    // map.addLayer({
    //   id: "points",
    //   type: "symbol",
    //   source: {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           type: "Feature",
    //           geometry: {
    //             type: "Point",
    //             coordinates: [init_coords.start_lng, init_coords.start_lat]
    //           }
    //         }
    //       ]
    //     }
    //   },
    //   layout: {
    //     "icon-image": "pulsing-dot"
    //   }
    // });
    getMatch([`${init_coords.start_lng}, ${init_coords.start_lat};${init_coords.end_lng}, ${init_coords.end_lat}`]);
    console.log([`${init_coords.start_lng}, ${init_coords.start_lat};${init_coords.end_lng}, ${init_coords.end_lat}`]);

    map.on('draw.create', updateRoute);
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
    // var answer = document.getElementById('calculated-line');
    var lastFeature = data.features.length - 1;
    console.log(data)
    var coords = data.features[lastFeature].geometry.coordinates;
    var newCoords = coords.join(';')
    getMatch(newCoords);
  }
  function getMatch(e) {
      // https://www.mapbox.com/api-documentation/#directions
      var url = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + e +'?geometries=geojson&steps=true&&access_token=pk.eyJ1IjoiY2hhcmxlcy1oZW5yaS1wb25pYXJkIiwiYSI6ImNqejhlZzh6eTFmbW0zaXF0ZTc4MWR5czkifQ.dnnwUr00nQCnROUKRAer0g';
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
          "line-color": "#D4A82A",
          "line-width": 8,
          "line-opacity": 0.8
        }
      });
    };
  }
  // getMatch ([`${-0.5714261481728897},${44.862692782270926} ; ${-0.5584657142138383}, ${44.893909504056664}`])


  // add the draw tool to the map
  // map.addControl(draw);

  // map.on('draw.update', updateRoute);
  // map.on('draw.delete', removeRoute);





const fakeCurrentPosition = () => {
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });


  const checkReload2 = (() => {
    let counter = -1;
    return () => {
      counter++;
      return counter;
    };
  })();
  {


  const refreshId = setInterval( () => {
    const properID = checkReload2();
    const coords = map.getSource("route")["_data"].geometry.coordinates

    map.addLayer({
        id: `points-${properID}`,
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: coords[properID]
                }
              }
            ]
          }
        },
        layout: {
          "icon-image": "pulsing-dot",
          'visibility': 'visible'
        }
      });
      console.log(`points-${properID}`);
      if (properID > 0) {
        const pos = map.setLayoutProperty(`points-${properID - 1}`, "visibility", "none");
      }



      if (properID >= coords.length - 1) {
        clearInterval(refreshId);
      }
    },
    1000
  );
  }
};

setTimeout(() => {
  fakeCurrentPosition()
  }
  ,1000);
}




 export { initMapbox };
