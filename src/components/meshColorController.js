import { changeMeshColor, getMeshColorHex } from "../utils/threejsUtils";
import { swatchMeshColors } from './swatch';

export const meshColorController = (newMesh, swatchColors = null) => {
  let meshes = null;
  let mesh;
  if(Array.isArray(newMesh)) {
    mesh = newMesh[0];
    meshes = newMesh;
  } else mesh = newMesh;

  const isEmpty = mesh.name.toLowerCase().includes('none');
  if(mesh.name.toLowerCase().includes('skin')) mesh.name = 'Skin';
  if(mesh.name.toLowerCase().includes('brows')) mesh.name = 'Hair';

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="customization__controller" id="${mesh.name}--controller">
      <div class="customization__controller--color">
        <label for=${mesh.name}>${isEmpty ? 'None' : mesh.name + ' color :'}</label>
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
    if(meshes) fragment.querySelector('.customization__controller').append(swatchMeshColors(meshes, swatchColors));
    else fragment.querySelector('.customization__controller').append(swatchMeshColors(mesh, swatchColors));
    fragment.querySelector(`#${mesh.name}--color`).onclick = () => {
      document.querySelectorAll(`.swatch__wrapper`).forEach(element => element.close());
      document.querySelector(`.swatch__wrapper--${mesh.name}`).show();
    }
  }
  else fragment.querySelector('input').onchange = () => {
    if(meshes) {
      meshes.forEach(mesh => {
        changeMeshColor(mesh, event.target.value);
      })
    } else changeMeshColor(mesh, event.target.value);
  }

  return fragment;
};