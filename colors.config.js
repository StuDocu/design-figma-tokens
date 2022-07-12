const { kebabCase } = require("style-dictionary/lib/utils/es6_");

function customFormatter(props) {
  return Object.entries(props.dictionary.properties)
    .reduce(
      (output, [key, value]) => {
        const children = Object.entries(value);

        // Checks if the children only contain colors
        // (if so, it's a color set, otherwise can be shadow, or a font definition)
        const isColorSet = children.every(
          ([childKey, childValue]) => childValue.type === "color"
        );
        if (!isColorSet) {
          return output;
        }

        return [
          ...output,

          // Adds a comment with the color group name
          `\n// ${key} shades`,

          // Goes through each color definition and sets the variable
          ...children.map(([childKey, childValue]) => {
            return `$rebranded-color-${kebabCase(key)}-${kebabCase(childKey)}: ${
              childValue.value
            };`;
          }),
        ];
      },
      ["// Rebranded color tokens"]
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
          destination: "_colors.scss",
          format: "customFormatter",
        },
      ],
    },
  },
};
