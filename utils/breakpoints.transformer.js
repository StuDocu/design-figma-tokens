const { kebabCase } = require("style-dictionary/lib/utils/es6_");

module.exports = {};
module.exports.breakpointsVariablesTransformer =
  function breakpointsVariablesTransformer(props, outputType) {
    const { Breakpoints } = props.dictionary.properties;

    return Object.entries(Breakpoints)
      .reduce(
        (output, [key, value]) => {
          const { value: itemValue } = value;

          return [
            ...output,

            // Goes through each spacing scale definition and sets the variable
            `$rebranded-breakpoints-${kebabCase(key)}: ${itemValue};`,
          ];
        },
        ["// Rebranded breakpoints tokens"]
      )
      .join("\n");
  };

module.exports.breakpointsMixinsTransformer =
  function breakpointsMixinsTransformer(props, outputType) {
    const { Breakpoints } = props.dictionary.properties;

    // Mixins
    return Object.entries(Breakpoints)
      .reduce(
        (output, [key, value]) => {
          const { value: itemValue } = value;

          if (Number(itemValue) <= 0) {
            return output;
          }

          const kebabCasedKey = kebabCase(key);
          return [
            ...output,

            // Goes through each spacing scale definition and sets the variable
            `@mixin from-${kebabCasedKey}($mediaType: 'screen') {
  @include from-breakpoint(${itemValue}, $mediaType) {
    @content;
  }
}\n`,
          ];
        },
        [
          "@import '../variables/breakpoints';\n",
          "// Rebranded breakpoints mixins",
          `@mixin from-breakpoint($minWidth, $mediaType: 'screen') {
  @media #{$mediaType} and (min-width: #{$minWidth}) {
    @content;
  }
}\n`
        ]
      )
      .join("\n");
  };
