const {
  breakpointsMixinsTransformer,
  breakpointsVariablesTransformer,
} = require("./utils/breakpoints.transformer");
const colorsTransformer = require("./utils/colors.transformer");
const {
  gridsMixinsTransformer,
  gridsVariablesTransformer,
} = require("./utils/grids.transformer");
const shadowsTransformer = require("./utils/shadows.transformer");
const spacingTransformer = require("./utils/spacing.transformer");

module.exports = {
  source: ["output.json"],
  format: {
    breakpointsMixinsTransformer,
    breakpointsVariablesTransformer,
    colorsTransformer,
    gridsVariablesTransformer,
    gridsMixinsTransformer,
    shadowsTransformer,
    spacingTransformer,
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
