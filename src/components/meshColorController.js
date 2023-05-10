import { changeMeshColor, getMeshColorHex } from "../utils/threejsUtils";
import { swatchMeshColors } from './swatch';

export const meshColorController = (mesh, swatchColors = null) => {
  const isEmpty = mesh.name.toLowerCase().includes('none');

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="customization__controller" id="${mesh.name}--controller">
      <div class="customization__controller--color">
        <label for=${mesh.name}>${isEmpty ? 'None' : mesh.name + ' Color :'}</label>
        ${isEmpty ? '' : swatchColors 
          ? 
          `<div 
            class="customization__controller--input" 
            id="${mesh.name}--color" 
            style="background-color: ${getMeshColorHex(mesh)}">&nbsp;
          </div>`
          : 
          `<input 
            type="color" 
            id=${mesh.name} 
            name=${mesh.name} 
            value=${getMeshColorHex(mesh)}
          >`
        }
      </div>
    </div>`
  );

  if(isEmpty) return fragment;
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