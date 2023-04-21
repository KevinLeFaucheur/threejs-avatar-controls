import { changeColor } from "./changeColor";

export const addFeatureButton = (group) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <button class="canvas__hud-add fa fa-plus"></button>
    `
  );

  const addNextFeature = () => {
    document.querySelector('.canvas__buttons--features').append(changeColor(findFirstAvailable(group)));
  };

  const findFirstAvailable = (group) => {
    const mesh = group.children.find(mesh => mesh.visible === false);
    if(mesh) {
      mesh.visible = !mesh.visible;

      if(!group.children.find(mesh => mesh.visible === false)) {
        document.querySelector('.canvas__buttons--add').innerHTML = '';
      }
    }
    return mesh;
  };

  fragment.querySelector('.canvas__hud-add').onclick = addNextFeature;

  return fragment;
}