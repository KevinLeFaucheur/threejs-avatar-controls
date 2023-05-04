import { Color } from "three";

export const lightController = ({ color, light, sun }) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="customization__controller">
			<input 
				type="range" min="-1" max="1" value="0" step="0.01" 
				class="slider" id="customization__controller--light">
    </div>
    `
  );

	fragment.getElementById('customization__controller--light').oninput = (e) => {
		let arcPosition = {
			x: Math.sin(e.target.value * Math.PI / 2) * 150,
			y: Math.cos(e.target.value * Math.PI / 2) * 150, 
			z: -250
		};
		light.position.set(arcPosition.x, arcPosition.y, arcPosition.z);
		sun.position.set(arcPosition.x, arcPosition.y, arcPosition.z);
		light.lookAt(0, 0, 0);

		let lerpValue = 1 - Math.abs(e.target.value);
		
		// let blue = 255 * lerpValue;
		// let green = Math.min(255, 255 * lerpValue + 140);

		// let red = Math.min(255, 255 * lerpValue);
		// let green = Math.min(255, 255 * lerpValue + 30);
		// let blue = Math.min(255, 255 * lerpValue + 75);

		const skyColors = {
			noon: new Color(0.4, 0.7, 1),
			twilight: new Color(`rgb(255, 162, 0)`),
			night: new Color(`rgb(2, 17, 64)`)
		}

		const sunColors = {
			noon: new Color('#FFF'),
			twilight: new Color(`rgb(255, 162, 0)`),
			night: new Color(`rgb(2, 17, 64)`)
		}

		light.color.copy(sunColors.twilight).lerp(sunColors.noon, lerpValue);
		sun.material.color.copy(sunColors.twilight).lerp(sunColors.noon, lerpValue);
		sun.material.emissive.copy(sunColors.twilight).lerp(sunColors.noon, lerpValue);
		color.copy(skyColors.twilight).lerp(skyColors.noon, lerpValue);

		if(light.position.y < 50 && light.position.y >= 25) 
		{
			light.color.copy(sunColors.twilight).lerp(sunColors.noon, lerpValue);
			sun.material.color.copy(sunColors.twilight).lerp(sunColors.noon, lerpValue);
			sun.material.emissive.copy(sunColors.twilight).lerp(sunColors.noon, lerpValue);
			color.copy(skyColors.twilight).lerp(skyColors.noon, lerpValue);
		}
		else if(light.position.y < 25) {
			const lerpFactor = Math.min(1, light.position.y / 25);
			
			light.color.copy(sunColors.night).lerp(sunColors.twilight, lerpFactor);
			sun.material.color.copy(sunColors.night).lerp(sunColors.twilight, lerpFactor);
			sun.material.emissive.copy(sunColors.night).lerp(sunColors.twilight, lerpFactor);
			color.copy(skyColors.night).lerp(skyColors.twilight, lerpFactor);
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