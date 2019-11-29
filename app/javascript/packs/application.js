import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!

import { initMapbox } from '../plugins/init_mapbox';

const counterElement = document.querySelector("#counter");
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
    counterElement.innerText = `${ 15 - properID} s`
    if (properID >= 15) {
      clearInterval(refreshId);
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
      form.submit();
    });

    }
  },
  1000
);
}



initMapbox();
