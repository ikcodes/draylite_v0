const drayliteRed = "#ca2e21";
const drayliteBlue = "#228BE6";

export const customTheme = {
  global: {
    font: {
      family: "Work Sans, serif",
      size: "16px",
      height: "16px",
    },
    // HOW THE FUCK DOES THIS WORK?
    // https://v2.grommet.io/drop#global.drop.extend
    drop: {
      // extend: `box-shadow: 'none'`,
    },
    colors: {
      brand: drayliteBlue,
      active: "rgba(221, 221, 221, 0.5)",
      "background-back": {
        dark: "#33333308",
        light: "#EDEDED",
      },
      "background-front": {
        dark: "#444444",
        light: "#FFFFFF",
      },
      "background-contrast": {
        light: "#33333310",
        dark: "#FFFFFF18",
      },
      "active-background": "background-contrast",
      "active-text": "text-strong",
      black: "#000000",
      border: {
        dark: "rgba(255, 255, 255, 0.33)",
        light: "rgba(0, 0, 0, 0.33)",
      },
      control: {
        dark: "accent-1",
        light: "brand",
      },
      focus: drayliteRed,
      "graph-0": "accent-1",
      "graph-1": "neutral-1",
      "graph-2": "neutral-2",
      "graph-3": "neutral-3",
      "graph-4": "neutral-4",
      placeholder: "#AAAAAA",
      selected: "brand",
      text: {
        dark: "#f8f8f8",
        light: "#444444",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#555555",
      },
      "text-xweak": {
        dark: "#BBBBBB",
        light: "#666666",
      },
      icon: {
        dark: "#f8f8f8",
        light: "#666666",
      },
      "selected-background": "brand",
      "selected-text": "text-strong",
      white: "#FFFFFF",
    },
  },
  button: {
    primary: {
      background: drayliteBlue,
    },
  },
  worldMap: {
    hover: {
      color: drayliteBlue, // ... doesn't seem to apply.
    },
    continent: {
      base: "6px",
      active: "10px",
    },
    place: {
      base: "8px",
      active: "12px",
    },
  },
};
