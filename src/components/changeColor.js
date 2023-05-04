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
            <div class="customization__controller--input" id="${mesh.name}--color" style="background-color: ${'#'+mesh?.material.color.getHexString()}">
              <i class="fa fa-palette"></i>
            </div>
            <input type="color" id=${mesh.name} name=${mesh.name} value=${'#'+mesh?.material.color.getHexString()}>
            `}
      </div>
    </div>
    `
  );

  if(isSwatch) {
    fragment.querySelector('.customization__controller').append(swatchMeshColors(mesh));
    fragment.querySelector(`#${mesh.name}--color`).onclick = () => {
      document.querySelectorAll(`.show`).forEach(element => element.classList.remove('show'));
      document.querySelector(`.swatch__wrapper--${mesh.name}`).classList.toggle('show');
    }
  }
  else fragment.querySelector('input').onchange = () => changeMeshColor(mesh, event.target.value);

  return fragment;
};