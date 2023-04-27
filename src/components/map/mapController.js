export const mapController = (map) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div id="customization__controller--map" class="customization__controller">

      <button class="fa fa-angle-left"></button>

      <p class='customization__controller--name'>${map.name}</p>

      <button class="fa fa-angle-right"></button>

    </div>
    `
  );

  console.log(map);

  fragment.querySelectorAll('#customization__controller--map > button').forEach(element => {
    element.onclick = () => console.log(element)
  });

  return fragment;
};