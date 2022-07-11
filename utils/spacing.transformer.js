const { kebabCase } = require("style-dictionary/lib/utils/es6_");

module.exports = function spacingTransformer(props) {
  return Object.entries(props.dictionary.properties)
    .reduce(
      (output, [key, value]) => {
        if (value.type !== "spacing") {
          return output;
        }

        const { value: itemValue } = value;

        return [
          ...output,

          // Goes through each color definition and sets the variable
          `$rebranded-spacing-${kebabCase(key)}: ${itemValue};`,
        ];
      },
      ["// Rebranded spacing scale tokens"]
    )
    .join("\n");
}
