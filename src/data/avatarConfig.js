import { randomHexColor } from "../utils/randomHexColor";

export const avatarNames = [
  'JOHN', 'UMAR', 'MARTY', 'MIKE',
  'KEN', 'YASIN', 'JERRY', 'GLENN',
  'JESSE', 'KHALID', 'OLIVER', 'LARRY',
  'ARON', 'SHAWN', 'MELVIN', 'AMIR',
];

export const skinColors = [
  "#F8DCD3", "#D3A292", "#CB7D52", "#A2663F", 
  "#77411D", "#50270C", "#2E1200", "#DD5F5F"
];

export const irisColors = [
  "#b46b3c", "#ac5b27", "#794044", "#092c86", 
  "#2acaea", "#20daa5", "#245923", "#b0e0e6",
  "#c6e2ff", "#f0f8ff", "#1c1c1c", "#666666"
];

export const avatarConfig = {
  name: () => avatarNames[Math.floor(Math.random()*avatarNames.length)],
  colors: {
    skin: () => skinColors[Math.floor(Math.random()*skinColors.length)],
    eye: '#FFF',
    iris: () => irisColors[Math.floor(Math.random()*skinColors.length)],
    brows: () => randomHexColor(),
  }
};