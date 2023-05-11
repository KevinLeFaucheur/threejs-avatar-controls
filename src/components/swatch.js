import { changeMeshColor } from "../utils/threejsUtils";

export const swatchMeshColors = (newMesh, colors) => {
  let meshes = null;
  let mesh;
  if(Array.isArray(newMesh)) {
    mesh = newMesh[0];
    meshes = newMesh;
  } else mesh = newMesh;

  const fragment = document.createRange().createContextualFragment(
    ` 
    <dialog class="swatch__wrapper swatch__wrapper--${mesh.name}">
      <div class="swatch__header">
        <p>Colors:</p>
        <button class="fa fa-regular fa-x close" formnovalidate></button>
      </div>
      <div class="swatch__container swatch__container--${mesh.name}">
        ${colors.map(color => `<div class="swatch__color" style="background-color: ${color}" id=${mesh.name}>&nbsp;</div>` ).join('')}
      </div>
    </dialog>
    `
  );

  fragment
    .querySelectorAll(`.swatch__wrapper--${mesh.name} .swatch__color`)
    .forEach(element => element.onclick = () => {
      const color = window.getComputedStyle(element).getPropertyValue("background-color");
      if(meshes) {
        meshes.forEach(mesh => {
          changeMeshColor(mesh, color);
        })
      } else changeMeshColor(mesh, color);
      document.getElementById(`${mesh.name}--color`).style.backgroundColor = color;
    });
    
  fragment.querySelector('.close').onclick = () => document.querySelector(`.swatch__wrapper--${mesh.name}`).close();

  return fragment;
}