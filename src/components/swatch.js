import { changeMeshColor } from "../handlers/changeMeshColor";

export const swatchMeshColors = (mesh) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="swatch__wrapper swatch__wrapper--${mesh.name}">
      <div class="swatch__header">
        <p>Colors:</p>
        <button class="far fa-regular fa-x close">x</button>
      </div>
      <div class="swatch__container swatch__container--${mesh.name}">
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

  console.log(fragment.querySelectorAll(`.swatch__wrapper--${mesh.name} .swatch__color`));
  console.log(mesh.name);

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