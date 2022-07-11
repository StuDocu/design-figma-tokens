const { kebabCase } = require("style-dictionary/lib/utils/es6_");

const fontMaps = {};

const weightMap = {
  bold: 700,
  medium: 500,
  regular: 400,
};

const convertWeight = (fontWeightValue) => {
  const weightParts = fontWeightValue.split(" ");
  const fontWeight = weightMap[weightParts[0].toLowerCase()] ?? weightMap.regular;
  const textDecoration = weightParts?.[1]?.toLowerCase();
  return { fontWeight, textDecoration };
};

const extractTypography = (value) => {
  return Object.entries(value)
    .filter(
      ([_, entry]) => entry?.fontFamily?.value && entry?.fontWeight?.value
    )
    .map(([_, { fontFamily, fontWeight }]) => ({
      fontFamily,
      fontWeight,
    }));
};

function customFormatter(props) {
  const fontFamilies = Object.entries(props.dictionary.properties.fontFamilies);
  const fontSizes = Object.entries(props.dictionary.properties.fontSize);
  // const fontWeights = Object.entries(props.dictionary.properties.fontWeights);
  const lineHeights = Object.entries(props.dictionary.properties.lineHeights);

  const typographyDefinitions = Object.entries(props.dictionary.properties)
    .reduce((output, [_, value]) => output.concat(extractTypography(value)), [])
    .reduce((output, entry) => {
      const { fontWeight, textDecoration } = convertWeight(
        entry.fontWeight.value
      );
      const fontFamily = entry.fontFamily.value;
      const key = `${kebabCase(fontFamily)}-${kebabCase(
        fontWeight.toString()
      )}${textDecoration ? "-" + kebabCase(textDecoration) : ""}`;
      return {
        ...output,
        [key]: {
          fontFamily,
          fontWeight,
          textDecoration,
        },
      };
    }, {});

  return `// Rebranded typography tokens

// Font families
${fontFamilies
  .map(
    ([fontFamilyName, fontFamilyValue]) =>
      `$rebranded-font-family-${kebabCase(fontFamilyName)}: "${
        fontFamilyValue.rawValue
      }";`
  )
  .join("\n")}

// Font sizes
${fontSizes
  .map(
    ([fontSizeScale, fontSizeValue]) =>
      `$rebranded-font-size-scale-${fontSizeScale}: ${fontSizeValue.rawValue};`
  )
  .join("\n")}

// Line heights
${lineHeights
  .map(
    ([lineHeightScale, lineHeightValue]) =>
      `$rebranded-line-height-scale-${lineHeightScale}: ${lineHeightValue.rawValue};`
  )
  .join("\n")}

// Fonts
$rebranded-fonts: ${Object.values(typographyDefinitions).map((entry) => `(
  "font-family": "${entry.fontFamily}",
  "font-weight": ${entry.fontWeight},
  "text-decoration": ${entry.textDecoration ?? null}
)`).join(', ')};

@mixin rebranded-fonts() {
  @each $rebranded-font in $rebranded-fonts {
    @font-face {
        font-family: "#{map-get($rebranded-font, "font-family")}";
        font-weight: #{map-get($rebranded-font, "font-weight")};
        $textDecoration: map-get($rebranded-font, "text-decoration");
        @if $textDecoration {
          text-decoration: $textDecoration;
        }
    }
  }
}

`;
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
          destination: "_fonts.scss",
          format: "customFormatter",
        },
      ],
    },
  },
};
