import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!

import { initMapbox } from '../plugins/init_mapbox';


function updateTransition() {
  var el = document.querySelector("div.infos-opponent");

  if (el) {
    el.className = "infos-opponent1";
  } else {
    el = document.querySelector("div.infos-opponent1");
    el.className = "infos-opponent";
  }

  return el;
}

function updateTransition2() {
  var el = document.querySelector("div.race-infos");

  if (el) {
    el.className = "race-infos1";
  } else {
    el = document.querySelector("div.race-infos1");
    el.className = "countdown";
  }

  return el;
}

const searchCounter = setInterval( () => {
  const counterElement = document.querySelector("#counter");
  if (counterElement) {
    countdown();
    updateTransition();
    updateTransition2();
    clearInterval(searchCounter);
  }
}, 5);

const submitStartingLocation = () => {
  navigator.geolocation.getCurrentPosition((data) =>  {
    const lat = data.coords.latitude;
    const long = data.coords.longitude;
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    input1.setAttribute("name", "lat");
    input1.setAttribute("value", lat);
    input1.setAttribute("type", "hidden");
    input2.setAttribute("name", "long");
    input2.setAttribute("value", long);
    input2.setAttribute("type", "hidden");

    const form = document.querySelector(".simple_form")
    form.prepend(input1)
    form.prepend(input2)

    console.log(form);

    Rails.fire(form, 'submit');
  });
};

const countdown = () => {
  const counterElement = document.querySelector("#counter");
  if (counterElement) {
    const CheckReload = (() => {
      let counter = 0;
      return () => {
        counter++;
        return counter;
      };
    })();
    {
    const refreshId = setInterval( () => {
        const properID = CheckReload();
        counterElement.innerText = `${ 10 - properID} s`
        if (properID >= 10) {
          clearInterval(refreshId);
          submitStartingLocation();
        }
      },
      1000
    );
    }
  }
};

// const current_position = navigator.geolocation.getCurrentPosition((pos) => {
//   const current_lat = pos.coords.latitude;
//   const current_lng = pos.coords.longitude;
//   console.log(current_lat);
//   console.log(current_lng);
// });

// const form = document.getElementById("race-finished");

//   function finish() {
//     console.log("penis");
//     form.submit();
//   }
//   setTimeout(finish(), 5000);
//   ;

const finshRace = function finishRAce() {

}

const raceFinished = setInterval( () => {
 navigator.geolocation.getCurrentPosition((data) =>  {
    let lat = data.coords.latitude;
    let long = data.coords.longitude;
    // const input1 = document.createElement("input");
    // const input2 = document.createElement("input");
    // input1.setAttribute("name", "lat");
    // input1.setAttribute("value", lat);
    // input1.setAttribute("type", "hidden");
    // input2.setAttribute("name", "long");
    // input2.setAttribute("value", long);
    // input2.setAttribute("type", "hidden");
    const form = document.querySelector("#race-finished")
    // form.prepend(input1)
    // form.prepend(input2)

    const finish_coords = document.querySelector("#map")
    const finish_lat = (JSON.parse(finish_coords.dataset.markers).end_lat);
    const finish_lng = (JSON.parse(finish_coords.dataset.markers).end_lng);

    if (lat === finish_lat && long === finish_lng) {
       form.submit();
    }


  });
},
 1000
 );

initMapbox();
