const colorsTransformer = require('./utils/colors.transformer');
const shadowsTransformer = require('./utils/shadows.transformer');
const spacingTransformer = require('./utils/spacing.transformer');

module.exports = {
  source: ["output.json"],
  format: {
    colorsTransformer,
    shadowsTransformer,
    spacingTransformer,
  },
  platforms: {
    scss: {
      buildPath: "output/",
      transformGroup: "scss",
      files: [
        {
          destination: "variables/_colors.scss",
          format: "colorsTransformer",
        },
        {
          destination: "variables/_shadows.scss",
          format: "shadowsTransformer",
        },
        {
          destination: "variables/_spacing.scss",
          format: "spacingTransformer",
        },
      ],
    },
  },
};
