import { maps } from "../../data/paths";
import { mapGroup } from "../../script";
import { load } from "../../utils/threejsUtils";
import { mapLoad } from "./mapLoader";

let mapIndex = 0;

export const mapController = (map, scene) => {
  console.log(map, scene);
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
      newIndex = newIndex < 0 ? maps.length-1 : newIndex >= maps.length ? 0 : newIndex;
      mapIndex = newIndex;
      
      mapGroup.clear();
      console.log(mapGroup);
      scene.remove(map);

      load(maps[mapIndex]).then((object) => { 
        let { scene: map } = object;

        map.name = `Map ${mapIndex+1}`;
        mapLoad(map);
        mapGroup.add(map);
        scene.add(map);

        console.log(map.name);

        document.getElementById('customization__controller--map').remove();
        document.querySelector('.customization--map').append(mapController(map, scene));
      });
    }
  });

  return fragment;
};