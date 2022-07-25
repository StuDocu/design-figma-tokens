module.exports = {};

const weightMap = {
    heavy: 900,
    bold: 700,
    medium: 500,
    regular: 400,
};

const convertWeight = (fontWeightValue) => {
    const weightParts = fontWeightValue.split(' ');
    const fontWeight = weightMap[weightParts[0].toLowerCase()] ?? weightMap.regular;
    const textDecoration = weightParts?.[1]?.toLowerCase();
    return { fontWeight, textDecoration };
};

module.exports.typographyVariablesTransformer = function typographyVariablesTransformer(props) {
    const textStyles = Object.entries(props.dictionary.properties['Text Styles']);

    const fontSizesReference = Object.entries(props.dictionary.properties['fontSize']).map(([key, item]) => [
        key,
        item.value,
    ]);

    const fontSizes = fontSizesReference
        .map(([key, value]) => `$rebranded-font-sizes-scale-${key}: ${value};`)
        .join('\n');

    const textStylesMap = textStyles
        .reduce((output, [key, item]) => {
            const entry = `"${key}": (
    "color": ${item.color.value},
    "font-family": "${item['font-family'].value}",
    "font-sizes": (
      ${Object.entries(item['font-sizes'])
          .map(([breakpoint, fontSizeObj]) => {
              const fontSizeValue = fontSizeObj['font-size'].value
                  .toString()
                  .split(' ')
                  .map((strPart) => {
                      const scale = fontSizesReference.find(([_, value]) => strPart === value);
                      return scale ? `$rebranded-font-sizes-scale-${scale[0]}` : strPart;
                  })
                  .join(' ');
              return `"${breakpoint}": ${fontSizeValue}`;
          })
          .join(',\n      ')}
    ),
    "font-weight": ${convertWeight(item['font-weight'].value).fontWeight},
    "line-height": ${item['line-height'].value},
    "margins": (
      ${Object.entries(item['margins'])
          .map(([breakpoint, fontSizeObj]) => `"${breakpoint}": ${fontSizeObj['margin'].value}`)
          .join(',\n      ')}
    )
  )`;
            return output.concat(entry);
        }, [])
        .join(',\n  ');
    return `// Rebranded font-size variables
${fontSizes}

// Rebranded text-styles map\n$rebranded-text-styles: (
  ${textStylesMap}
);`;
};

module.exports.typographyMixinsTransformer = function typographyMixinsTransformer(props) {
    return `@use 'sass:map';
@import '../variables/typography';
@import './breakpoints';

@mixin get-text-style($key) {
  $style: map.get($rebranded-text-styles, $key);
  
  @if $style {
    color: map.get($style, 'color');
    font-family: #{map.get($style, 'font-family')}, sans-serif;
    font-weight: map.get($style, 'font-weight');
    line-height: map.get($style, 'line-height');

    @each $breakpoint, $fontSize in map.get($style, 'font-sizes') {
      @if $breakpoint == "small" {
        font-size: $fontSize;
      } @else {
        @include from-breakpoint($breakpoint) {
          font-size: $fontSize;
        }
      }
    }

    @each $breakpoint, $margin in map.get($style, 'margins') {
      @if $breakpoint == "small" {
        margin: $margin;
      } @else {
        @include from-breakpoint($breakpoint) {
          margin: $margin;
        }
      }
    }
  }
}`;
};
