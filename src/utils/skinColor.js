export const skinColor = () => {
  const randomInt = (max) => Math.floor(Math.random() * (max + 1));

  const intToHex = (int) => {
    const hex = int.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  const red = Math.max(40, randomInt(255));
  const green = randomInt(red * 0.8);
  const blue = randomInt(green * 0.6);

  const color = "#" + intToHex(red) + intToHex(green) + intToHex(blue);

  return color;
}