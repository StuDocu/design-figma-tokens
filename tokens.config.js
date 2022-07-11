const spacingTransformer = require('./utils/spacing.transformer');

module.exports = {
  source: ["output.json"],
  format: {
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
      ],
    },
  },
};
