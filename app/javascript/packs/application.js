import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!

import { initMapbox } from '../plugins/init_mapbox';

initMapbox();

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
    }
  },
  1000
);
}

