import { changeMeshColor } from '../handlers/changeMeshColor';
import { swatchMeshColors } from './swatch';

export const changeColor = (mesh, bool = false) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__button">
      <label for=${mesh.name}>${mesh.name} Color: </label>
      ${bool 
        ? `<div class="input__color" id="input__color--${mesh.name}" style="background-color: ${'#'+mesh?.material.color.getHexString()}" id=${mesh.name}">&nbsp;</div>`
        : `<input type="color" id=${mesh.name} name=${mesh.name} value=${'#'+mesh?.material.color.getHexString()}>`}
    </div>
    `
  );

  if(bool) {
    fragment.querySelector('.canvas__button').append(swatchMeshColors(mesh));
    fragment.querySelector(`#input__color--${mesh.name}`).onclick = () => document.querySelector('.swatch__wrapper').classList.toggle('show');
  }
  else fragment.querySelector('input').onchange = () => changeMeshColor(mesh, event.target.value);

  return fragment;
};