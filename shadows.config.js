const { kebabCase } = require("style-dictionary/lib/utils/es6_");

function hexToRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    // No alpha channel? Return RGB format
    if (!result[4]) {
      return `rgb(${r}, ${g}, ${b})`;
    }

    const a = Math.floor(parseInt(result[4], 16) / 255 * 100);
    return `rgba(${r}, ${g}, ${b}, ${a}%)`;
  }
  return null;
}

function customFormatter(props) {
  return Object.entries(props.dictionary.properties)
    .reduce(
      (output, [key, value]) => {
        if (
          !(
            value.type &&
            ["dropShadow", "innerShadow"].includes(value.type.value)
          )
        ) {
          return output;
        }

        const { blur, color, spread, x, y } = value;

        const offsetX = x.value === 0 ? "0" : `${x.value}px`;
        const offsetY = y.value === 0 ? "0" : `${y.value}px`;
        const blurRadius = blur.value === 0 ? "0" : `${blur.value}px`;
        const spreadValue = spread.value === 0 ? "0" : `${spread.value}px`;
        const colorInRGB = hexToRGB(color.value);

        if (!colorInRGB) {
          return output;
        }

        return [
          ...output,
          // Goes through each color definition and sets the variable
          `$${kebabCase(key)}: ${
            value.type.value === "innerShadow" ? "inset " : ""
          }${offsetX} ${offsetY} ${blurRadius} ${spreadValue} ${colorInRGB};`,
        ];
      },
      ["// Rebranded shadow tokens"]
    )
    .join("\n");
}

module.exports = {
  source: ["output.json"],
  format: {
    customFormatter,
  },
  platforms: {
    scss: {
      buildPath: "output/",
      transformGroup: "scss",
      files: [
        {
          destination: "_shadows.scss",
          format: "customFormatter",
        },
      ],
    },
  },
};
