import { changeMeshColor } from "../utils/threejsUtils";
import { swatchMeshColors } from './swatch';

export const meshColorController = (mesh, swatchColors = null) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="customization__controller">
      <div class="customization__controller--color">
        <label for=${mesh.name}>${mesh.name} Color: </label>
        ${swatchColors 
          ? 
          `<div 
            class="customization__controller--input" 
            id="${mesh.name}--color" 
            style="background-color: ${'#'+mesh?.material.color.getHexString()}">&nbsp;
          </div>`
          : 
          `<input 
            type="color" 
            id=${mesh.name} 
            name=${mesh.name} 
            value=${'#'+mesh?.material.color.getHexString()}
          >`
        }
      </div>
    </div>`
  );

  if(swatchColors) {
    fragment.querySelector('.customization__controller').append(swatchMeshColors(mesh, swatchColors));
    fragment.querySelector(`#${mesh.name}--color`).onclick = () => {
      document.querySelectorAll(`.swatch__wrapper`).forEach(element => element.close());
      document.querySelector(`.swatch__wrapper--${mesh.name}`).show();
    }
  }
  else fragment.querySelector('input').onchange = () => changeMeshColor(mesh, event.target.value);

  return fragment;
};