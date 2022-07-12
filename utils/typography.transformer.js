const kebabCase = require("lodash.kebabcase");

module.exports = {};

const weightMap = {
  heavy: 900,
  bold: 700,
  medium: 500,
  regular: 400,
};

const convertWeight = (fontWeightValue) => {
  const weightParts = fontWeightValue.split(" ");
  const fontWeight =
    weightMap[weightParts[0].toLowerCase()] ?? weightMap.regular;
  const textDecoration = weightParts?.[1]?.toLowerCase();
  return { fontWeight, textDecoration };
};

module.exports.textStylesVariablesTransformer = function textStylesVariablesTransformer(props) {
  const textStyles = Object.entries(props.dictionary.properties["Text Styles"]);
  const textStylesMap = textStyles
    .reduce((output, [key, item]) => {
      const children = Object.entries(item);
      const entry = `"${key}": (
    ${children
      .map(([key, child]) => {
        if (child.value) {
          return `"${key}": ${key === 'font-weight' ? convertWeight(child.value).fontWeight : child.value}`;
        }

        return `"${key}": (
      ${Object.entries(child)
            .map(
              ([childKey, childItem]) =>
                `"${childKey}": ${childItem["font-size"].value}`
            )
            .join(",\n      ")}
    )`;
      })
      .join(",\n    ")}
  )`;
      return output.concat(entry);
    }, [])
    .join(",\n  ");
  return `$textStylesMap: (
  ${textStylesMap}
);`;
};

module.exports.textStylesMixinsTransformer = function textStylesMixinsTransformer(props) {
  const textStyles = Object.entries(props.dictionary.properties["Text Styles"]);
  const textStylesMap = textStyles
    .reduce((output, [key, item]) => {
      const children = Object.entries(item);
      const entry = `"${key}": (
    ${children
      .map(([key, child]) => {
        if (child.value) {
          return `"${key}": ${key === 'font-weight' ? convertWeight(child.value).fontWeight : child.value}`;
        }

        return `"${key}": (
      ${Object.entries(child)
            .map(
              ([childKey, childItem]) =>
                `"${childKey}": ${childItem["font-size"].value}`
            )
            .join(",\n      ")}
    )`;
      })
      .join(",\n    ")}
  )`;
      return output.concat(entry);
    }, [])
    .join(",\n  ");
  return `@import '../variables/textStyles';
@import './breakpoints';

@mixin get-text-style($key) {
  $style: map-get($textStylesMap, $key);
  
  @if $style {
    color: map-get($style, 'color');
    font-family: #{map-get($style, 'font-family')}, sans-serif;
    font-weight: map-get($style, 'font-weight');
    line-height: map-get($style, 'line-height');

    
    @each $breakpoint, $fontSize in map-get($style, 'font-sizes') {
      @if $breakpoint == "small" {
        font-size: $fontSize;
      } @else {
        @include from-breakpoint($breakpoint) {
          font-size: $fontSize;
        }
      }
    }
  }
}`;
};