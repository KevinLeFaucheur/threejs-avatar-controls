import { changeMeshColor } from "../handlers/changeMeshColor";
import { skinColors } from "../data/avatarConfig";

export const swatchMeshColors = (mesh) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <dialog class="swatch__wrapper swatch__wrapper--${mesh.name}">
      <div class="swatch__header">
        <p>Colors:</p>
        <button class="fa fa-regular fa-x close" formnovalidate></button>
      </div>
      <div class="swatch__container swatch__container--${mesh.name}">
        ${skinColors.map(color => `<div class="swatch__color" style="background-color: ${color}" id=${mesh.name}>&nbsp;</div>` ).join('')}
      </div>
    </dialog>
    `
  );

  fragment
    .querySelectorAll(`.swatch__wrapper--${mesh.name} .swatch__color`)
    .forEach(element => element.onclick = () => {
      const color = window.getComputedStyle(element).getPropertyValue("background-color");
      changeMeshColor(mesh, color);
      document.getElementById(`${mesh.name}--color`).style.backgroundColor = color;
    });
    
  fragment.querySelector('.close').onclick = () => document.querySelector(`.swatch__wrapper--${mesh.name}`).close();

  return fragment;
}