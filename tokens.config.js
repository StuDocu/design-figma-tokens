const colorsTransformer = require('./utils/colors.transformer');
const spacingTransformer = require('./utils/spacing.transformer');

module.exports = {
  source: ["output.json"],
  format: {
    colorsTransformer,
    spacingTransformer,
  },
  platforms: {
    scss: {
      buildPath: "output/",
      transformGroup: "scss",
      files: [
        {
          destination: "variables/_spacing.scss",
          format: "spacingTransformer",
        },
        {
          destination: "variables/_colors.scss",
          format: "colorsTransformer",
        },
      ],
    },
  },
};
