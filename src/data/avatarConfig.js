import { randomHexColor } from "../utils/randomHexColor";

export const avatarNames = [
  'JOHN', 'UMAR', 'MARTY', 'MIKE',
  'KEN', 'YASIN', 'JERRY', 'GLENN',
  'JESSE', 'KHALID', 'OLIVER', 'LARRY',
  'ARON', 'SHAWN', 'MELVIN', 'AMIR',
];

export const skinColors = [
  "#FBD4CB", '#ffdbac', "#f1c27d", "#e0ac69", "#F9BD86",
  "#c68642", "#CB7D52", "#A2663F", "#8d5524", "#77411D", 
  "#50270C", "#2E1200", "#FF8C80"
];

export const irisColors = [
  "#b46b3c", "#ac5b27", "#794044", "#092c86", 
  "#2acaea", "#20daa5", "#245923", "#b0e0e6",
  "#c6e2ff", "#f0f8ff", "#1c1c1c", "#666666"
];

export const hairColors = [
  "#f0e38e", '#ead068', "#dac586", "#b29258", "#8d6e37",
  "#ea871e", "#d5750a", "#c06205", "#ac4f00", "#7e3a06", 
  "#8c4d44", "#884c42", "#48271e", "#47261d", "#20150f"
];

export const avatarConfig = {
  name: () => avatarNames[Math.floor(Math.random()*avatarNames.length)],
  colors: {
    skin: () => skinColors[Math.floor(Math.random()*skinColors.length)],
    eye: '#FFF',
    iris: () => irisColors[Math.floor(Math.random()*skinColors.length)],
    brows: () => hairColors[Math.floor(Math.random()*skinColors.length)],
  }
};