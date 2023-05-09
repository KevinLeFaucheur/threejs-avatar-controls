import { changeMeshColor } from '../handlers/changeMeshColor';
import { swatchMeshColors } from './swatch';

export const changeColor = (mesh, isSwatch = false) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="customization__controller">
      <div class="customization__controller--color">
        <label for=${mesh.name}>${mesh.name} Color: </label>
        ${isSwatch 
          ? `<div class="customization__controller--input" id="${mesh.name}--color" style="background-color: ${'#'+mesh?.material.color.getHexString()}">&nbsp;</div>`
          : `
            <input type="color" id=${mesh.name} name=${mesh.name} value=${'#'+mesh?.material.color.getHexString()}>
            `}
      </div>
    </div>
    `
  );

  if(isSwatch) {
    fragment.querySelector('.customization__controller').append(swatchMeshColors(mesh));
    fragment.querySelector(`#${mesh.name}--color`).onclick = () => {
      document.querySelectorAll(`.swatch__wrapper`).forEach(element => element.close());
      document.querySelector(`.swatch__wrapper--${mesh.name}`).show();
    }
  }
  else fragment.querySelector('input').onchange = () => changeMeshColor(mesh, event.target.value);

  return fragment;
};