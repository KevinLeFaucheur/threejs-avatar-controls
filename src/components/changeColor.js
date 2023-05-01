import { changeMeshColor } from '../handlers/changeMeshColor';
import { swatchMeshColors } from './swatch';

export const changeColor = (mesh, bool = false) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="customization__controller">
      <label for=${mesh.name}>${mesh.name} Color: </label>
      ${bool 
        ? `<div class="customization__controller--color" id="${mesh.name}--color" style="background-color: ${'#'+mesh?.material.color.getHexString()}" id=${mesh.name}">&nbsp;</div>`
        : `<input type="color" id=${mesh.name} name=${mesh.name} value=${'#'+mesh?.material.color.getHexString()}>`}
    </div>
    `
  );

  if(bool) {
    fragment.querySelector('.customization__controller').append(swatchMeshColors(mesh));
    fragment.querySelector(`#${mesh.name}--color`).onclick = () => document.querySelector(`.swatch__wrapper--${mesh.name}`).classList.toggle('show');
  }
  else fragment.querySelector('input').onchange = () => changeMeshColor(mesh, event.target.value);

  return fragment;
};