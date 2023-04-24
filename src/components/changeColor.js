import { changeMeshColor } from '../handlers/changeMeshColor';

export const changeColor = (mesh) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__button">
      <label for=${mesh.name}>${mesh.name} Color: </label>
      <input type="color" id=${mesh.name}" name=${mesh.name} value=${'#'+mesh?.material.color.getHexString()}>
    </div>
    `
  );

  fragment.querySelector('input').onchange = () => changeMeshColor(mesh, event.target.value);

  return fragment;
};