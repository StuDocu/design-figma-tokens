const { generateAllMixinsFile, generateAllVariablesFile } = require('./utils/all.generator');
const {
  breakpointsMixinsTransformer,
  breakpointsVariablesTransformer,
} = require("./utils/breakpoints.transformer");
const colorsTransformer = require("./utils/colors.transformer");
const {
  gridsMixinsTransformer,
  gridsVariablesTransformer,
} = require("./utils/grids.transformer");
const radiusTransformer = require("./utils/radius.transformer");
const shadowsTransformer = require("./utils/shadows.transformer");
const spacingTransformer = require("./utils/spacing.transformer");
const {
  textColorsVariablesTransformer,
  textStylesMixinsTransformer,
  textStylesVariablesTransformer,
} = require("./utils/typography.transformer");

module.exports = {
  source: ["output.json"],
  format: {
    breakpointsMixinsTransformer,
    breakpointsVariablesTransformer,
    colorsTransformer,
    generateAllMixinsFile,
    generateAllVariablesFile,
    gridsVariablesTransformer,
    gridsMixinsTransformer,
    radiusTransformer,
    shadowsTransformer,
    spacingTransformer,
    textColorsVariablesTransformer,
    textStylesVariablesTransformer,
    textStylesMixinsTransformer,
  },
  platforms: {
    scss: {
      buildPath: "output/",
      transformGroup: "scss",
      files: [
        {
          destination: "variables/_breakpoints.scss",
          format: "breakpointsVariablesTransformer",
        },
        {
          destination: "mixins/_breakpoints.scss",
          format: "breakpointsMixinsTransformer",
        },
        {
          destination: "variables/_grids.scss",
          format: "gridsVariablesTransformer",
        },
        {
          destination: "mixins/_grids.scss",
          format: "gridsMixinsTransformer",
        },
        {
          destination: "variables/_colors.scss",
          format: "colorsTransformer",
        },
        {
          destination: "variables/_borderRadius.scss",
          format: "radiusTransformer",
        },
        {
          destination: "variables/_shadows.scss",
          format: "shadowsTransformer",
        },
        {
          destination: "variables/_spacing.scss",
          format: "spacingTransformer",
        },
        {
          destination: "variables/_textColors.scss",
          format: "textColorsVariablesTransformer",
        },
        {
          destination: "variables/_textStyles.scss",
          format: "textStylesVariablesTransformer",
        },
        {
          destination: "mixins/_textStyles.scss",
          format: "textStylesMixinsTransformer",
        },
        {
          destination: "mixins/all.scss",
          format: "generateAllMixinsFile",
        },
        {
          destination: "variables/all.scss",
          format: "generateAllVariablesFile",
        },
      ],
    },
  },
};
