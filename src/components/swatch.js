import { changeMeshColor } from "../handlers/changeMeshColor";
import { skinColors } from "../data/colors";

export const swatchMeshColors = (mesh) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="swatch__wrapper swatch__wrapper--${mesh.name}">
      <div class="swatch__header">
        <p>Colors:</p>
        <button class="far fa-regular fa-x close">x</button>
      </div>
      <div class="swatch__container swatch__container--${mesh.name}">
        ${skinColors.forEach(color => {
          `<div class="swatch__color" style="background-color: ${color}" id=${mesh.name}">&nbsp;</div>`
        })}
      </div>
    </div>
    `
  );

  fragment
    .querySelectorAll(`.swatch__wrapper--${mesh.name} .swatch__color`)
    .forEach(element => element.onclick = () => {
      const color = window.getComputedStyle(element).getPropertyValue("background-color");
      console.log(element);
      changeMeshColor(mesh, color);
      document.getElementById(`${mesh.name}--color`).style.backgroundColor = color;
    });
  fragment.querySelector('.close').onclick = () => document.querySelector(`.swatch__wrapper--${mesh.name}`).classList.toggle('show');
  
  // window.addEventListener('click', function(e){   
  //   if (document.querySelector('.canvas__button').contains(e.target)) {
  //   } else {
  //     document.querySelector('.swatch__wrapper').classList.remove('show');
  //   }
  // });

  return fragment;
}