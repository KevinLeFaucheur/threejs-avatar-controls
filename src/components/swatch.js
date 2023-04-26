import { changeMeshColor } from "../handlers/changeMeshColor";
import { randomHexColor } from "../utils/randomHexColor";

export const swatchMeshColors = (mesh) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="swatch__wrapper">
      <div class="swatch__header">
        <p>Colors:</p>
        <button class="far fa-regular fa-x close">x</button>
      </div>
      <div class="swatch__container">
        <div class="swatch__color" style="background-color: #F8DCD3" id=${mesh.name}">&nbsp;</div>
        <div class="swatch__color" style="background-color: #D3A292" id=${mesh.name}">&nbsp;</div>
        <div class="swatch__color" style="background-color: #CB7D52" id=${mesh.name}">&nbsp;</div>
        <div class="swatch__color" style="background-color: #A2663F" id=${mesh.name}">&nbsp;</div>
        <div class="swatch__color" style="background-color: #77411D" id=${mesh.name}">&nbsp;</div>
        <div class="swatch__color" style="background-color: #50270C" id=${mesh.name}">&nbsp;</div>
        <div class="swatch__color" style="background-color: #2E1200" id=${mesh.name}">&nbsp;</div>
        <div class="swatch__color" style="background-color: #DD5F5F" id=${mesh.name}">&nbsp;</div>
      </div>
    </div>
    `
  );

  const x = () => {
  };

  const y = () => {
  };

  fragment
    .querySelectorAll('.swatch__color')
    .forEach(element => element.onclick = () => {
      changeMeshColor(mesh, window.getComputedStyle(element).getPropertyValue("background-color"))
    });
  fragment.querySelector('.close').onclick = () => document.querySelector('.swatch__wrapper').classList.toggle('show');
  
  // window.addEventListener('click', function(e){   
  //   if (document.querySelector('.canvas__button').contains(e.target)) {
  //   } else {
  //     document.querySelector('.swatch__wrapper').classList.remove('show');
  //   }
  // });

  return fragment;
}