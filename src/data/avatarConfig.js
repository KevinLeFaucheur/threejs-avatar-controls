import { randomHexColor } from "../utils/randomHexColor";

const avatarNames = [
  'JOHN', 'BOB', 'MARTY', 'MIKE'
];

export const skinColors = [
  "#F8DCD3", "#D3A292", "#CB7D52", "#A2663F", 
  "#77411D", "#50270C", "#2E1200", "#DD5F5F"
];

export const avatarConfig = {
  name: avatarNames[Math.floor(Math.random()*skinColors.length)],
  colors: {
    skin: skinColors[Math.floor(Math.random()*skinColors.length)],
    eye: '#FFF',
    iris: randomHexColor(),
    brows: randomHexColor(),
  }
};