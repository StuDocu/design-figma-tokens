const kebabCase = require("lodash.kebabcase");

module.exports = {};
module.exports.breakpointsVariablesTransformer =
  function breakpointsVariablesTransformer(props) {
    const { Breakpoints } = props.dictionary.properties;

    return `// Rebranded breakpoints tokens
$rebranded-breakpoints: (
  ${Object.entries(Breakpoints)
    .map(
      // Goes through each spacing scale definition and sets the variable
      ([key, item]) => `"${kebabCase(key)}": ${item.value}`
    )
    .join(",\n  ")}
);`;
  };

module.exports.breakpointsMixinsTransformer =
  function breakpointsMixinsTransformer(props) {
    const { Breakpoints } = props.dictionary.properties;

    // Mixins
    return Object.entries(Breakpoints)
      .reduce(
        (output, [key, value]) => {
          const { value: itemValue } = value;

          if (parseInt(itemValue, 10) <= 0) {
            return output;
          }

          const kebabCasedKey = kebabCase(key);
          return [
            ...output,

            // Goes through each breakpoint scale definition and sets the mixin
            `@mixin from-${kebabCasedKey}($mediaType: 'screen') {
  @include from-breakpoint(${kebabCasedKey}, $mediaType) {
    @content;
  }
}\n`,
          ];
        },
        [
          "@use 'sass:map';",
          "@import '../variables/breakpoints';\n",
          "// Rebranded breakpoints mixins",
          `@mixin from-breakpoint($breakpoint, $mediaType: 'screen') {
  @media #{$mediaType} and (min-width: #{map.get($rebranded-breakpoints, $breakpoint)}) {
    @content;
  }
}\n`,
        ]
      )
      .join("\n");
  };
