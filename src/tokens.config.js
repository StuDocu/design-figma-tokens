const path = require("path");

const {
  generateAllMixinsFile,
  generateAllVariablesFile,
} = require("./utils/scss/all.scss.generator");
const {
  breakpointsMixinsTransformer,
  breakpointsVariablesTransformer,
} = require("./utils/scss/breakpoints.scss.transformer");
const colorsTransformer = require("./utils/scss/colors.scss.transformer");
const {
  gridsMixinsTransformer,
  gridsVariablesTransformer,
} = require("./utils/scss/grids.scss.transformer");
const radiusTransformer = require("./utils/scss/radius.scss.transformer");
const shadowsTransformer = require("./utils/scss/shadows.scss.transformer");
const spacingTransformer = require("./utils/scss/spacing.scss.transformer");
const {
  typographyMixinsTransformer,
  typographyVariablesTransformer,
} = require("./utils/scss/typography.scss.transformer");

module.exports = {
  source: [path.join(__dirname, "..", "transformedTokens.json")],
  format: {
    // Responsible for generating the `_breakpoints.scss` in both mixins and variables folders
    breakpointsMixinsTransformer,
    breakpointsVariablesTransformer,

    // Responsible for generating the `_colors.scss` in variables
    colorsTransformer,

    // Responsible for generating the `all.scss` in both mixins and variables folders
    generateAllMixinsFile,
    generateAllVariablesFile,

    // Responsible for generating the `_grids.scss` in both mixins and variables folders
    gridsVariablesTransformer,
    gridsMixinsTransformer,

    // Responsible for generating the `_borderRadius.scss` in variables
    radiusTransformer,

    // Responsible for generating the `_shadows.scss` in variables
    shadowsTransformer,

    // Responsible for generating the `_spacing.scss` in variables
    spacingTransformer,

    // Responsible for generating the `_typography.scss` on both mixins and variables folders
    typographyVariablesTransformer,
    typographyMixinsTransformer,
  },
  platforms: {
    scss: {
      buildPath: `${path.join(__dirname, "..")}/`,
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
          destination: "variables/_typography.scss",
          format: "typographyVariablesTransformer",
        },
        {
          destination: "mixins/_typography.scss",
          format: "typographyMixinsTransformer",
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
