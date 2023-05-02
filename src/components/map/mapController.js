export const mapController = (map, scene) => {
  console.log(map, scene);
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div id="customization__controller--map" class="customization__controller">

      <button class="fa fa-angle-left"></button>

      <p class='customization__controller--name'>${map.name}</p>

      <button class="fa fa-angle-right"></button>

    </div>
    `
  );

  fragment.querySelectorAll('#customization__controller--map > button').forEach((element, index) => {
    element.onclick = () => {
      let currentIndex = map.parent.children.findIndex(child => child.name === map.name);
      console.log(currentIndex);
      
      // console.log(element, index === 0 ? '-1' : '1');
      // scene.add(map.parent.children[])
    }
  });

  return fragment;
};