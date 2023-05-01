import { Color } from "three";

export const lightController = (light) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="customization__controller">
			<input 
				type="range" min="-1" max="1" value="0.5" step="0.01" 
				class="slider" id="customization__controller--light">
    </div>
    `
  );

	fragment.getElementById('customization__controller--light').oninput = (e) => {
		light.position.set(Math.sin(e.target.value * Math.PI / 2) * 100, Math.cos(e.target.value * Math.PI / 2) * 100, 0);

		let lerpValue = 1 - Math.abs(e.target.value);
		
		if(light.position.y > 50) {
			light.color = new Color('#FFF');
		}
		else if(light.position.y <= 50 && light.position.y > 25) {
			// let blue = lerp(light.color.b, 0, 1);
			// let green = lerp(light.color.g, 140, 1);
			// light.color = new Color(`rgb(255, ${Math.floor(green)}, ${Math.floor(blue )})`);
			
			let blue = 255 * lerpValue;
			let green = Math.min(255, 255 * lerpValue + 140);
			light.color = new Color(`rgb(255, ${Math.floor(green)}, ${Math.floor(blue )})`);
		}
		else {
			// let red = lerp(light.color.r, 0, 0.1);
			// let green = lerp(light.color.g, 30, 0.1);
			// let blue = lerp(light.color.b, 55, 0.1);
			// light.color = new Color(`rgb(${Math.floor(red)}, ${Math.floor(green)}, ${Math.floor(blue )})`);

			let red = Math.min(255, 255 * lerpValue);
			let green = Math.min(255, 255 * lerpValue + 30);
			let blue = Math.min(255, 255 * lerpValue + 75);
			light.color = new Color(`rgb(${Math.floor(red)}, ${Math.floor(green)}, ${Math.floor(blue )})`);
		}
	}

	const intToHex = (int) => {
    const hex = int.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

	const lerp = (start, end, amt) => {
		return (1 - amt) * start + amt * end;
	}

  return fragment;
}