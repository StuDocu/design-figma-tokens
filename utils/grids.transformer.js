const { kebabCase } = require("style-dictionary/lib/utils/es6_");

module.exports = {};
module.exports.gridsVariablesTransformer = function gridsVariablesTransformer(
  props
) {
  const { Grid } = props.dictionary.properties;

  const regularGrids = Object.entries(Grid).reduce(
    (output, [key, gridValue]) => {
      if (key === "exceptions") {
        return output;
      }

      return [
        ...output,

        `// Grid ${key}`,
        `$rebranded-${gridValue.breakpoint.name}: ${gridValue.breakpoint.value};`,
        `$rebranded-${gridValue["column-number"].name}: ${gridValue["column-number"].value};`,
        `$rebranded-${gridValue["column-gap"].name}: ${gridValue["column-gap"].value};`,
        `$rebranded-${gridValue["max-width"].name}: ${gridValue["max-width"].value};`,
        `$rebranded-${gridValue["outer-margin"].name}: ${gridValue["outer-margin"].value};\n`,
      ];
    },
    ["@import './breakpoints';\n", "// Rebranded grid tokens\n"]
  );

  const exceptions = Object.entries(Grid.exceptions).reduce(
    (output, [key, gridValue]) => {
      return [
        ...output,

        `// Grid ${key}`,
        `$rebranded-${gridValue.breakpoint.name}: ${gridValue.breakpoint.value};`,
        `$rebranded-${gridValue["sidebar-width"].name}: ${gridValue["sidebar-width"].value};`,
        `$rebranded-${gridValue["column-gap"].name}: ${gridValue["column-gap"].value};`,
        `$rebranded-${gridValue["outer-margin"].name}: ${gridValue["outer-margin"].value};`,
        `$rebranded-${gridValue["sub-grid-column-number"].name}: ${gridValue["sub-grid-column-number"].value};`,
        `$rebranded-${gridValue["sub-grid-column-gap"].name}: ${gridValue["sub-grid-column-gap"].value};\n`,
      ];
    },
    []
  );

  return regularGrids.concat(exceptions).join("\n");
};

module.exports.gridsMixinsTransformer = function gridsMixinsTransformer(props) {
  const { Grid } = props.dictionary.properties;

  return `@import './breakpoints';
@import '../variables/grids';

@mixin grid() {
  display: grid;
  ${Object.entries(Grid)
    .filter(([key]) => key !== "exceptions")
    .reduce((output, [key, gridValue]) => {
      const indentation = '  '.repeat(Number(parseInt(gridValue.breakpoint.value, 10) > 0) + 1);
      const css = `column-gap: $rebranded-grid-${key}-column-gap;
${indentation}grid-template-columns: repeat($rebranded-grid-${key}-column-number, minmax(0, 1fr));`;
      return `${output}${
        gridValue.breakpoint.value <= 0
          ? css
          : `

  @include from-${key}() {
    ${css}
  }`
      }`;
    }, "")}
}
`;
};
