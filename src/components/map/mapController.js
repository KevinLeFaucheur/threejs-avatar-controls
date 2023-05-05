import { maps } from "../../data/paths";
import { load } from "../../utils/threejsUtils";
import { mapLoad } from "./mapLoader";

let mapIndex = 0;

export const mapController = (map, group) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div id="customization__controller--map" class="customization__controller">

      <button class="fa fa-angle-left"></button>

      <p class='customization__controller--name'>${map.name}</p>

      <button class="fa fa-angle-right"></button>

    </div>
    `
  );

  fragment.querySelectorAll('#customization__controller--map > button').forEach((element, index) => {
    element.onclick = () => {

      let offset = index === 0 ? -1 : 1;
      let newIndex = (mapIndex + offset);
      mapIndex = newIndex < 0 ? maps.length-1 : newIndex >= maps.length ? 0 : newIndex;;
      
      group.clear();

      load(maps[mapIndex]).then((object) => { 
        let { scene: map } = object;

        map.name = `Map ${mapIndex+1}`;
        mapLoad(map);
        group.add(map);

        document.getElementById('customization__controller--map').remove();
        document.querySelector('.customization--map').append(mapController(map, group));
      });
    }
  });

  return fragment;
};