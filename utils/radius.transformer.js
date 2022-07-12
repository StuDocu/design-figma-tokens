const kebabCase = require("lodash.kebabcase");

module.exports = function radiusTransformer(props) {
  return `// Rebranded border radius scale
${Object.entries(props.dictionary.properties)
  .filter(([key, item]) => item.type === "borderRadius")
  .map(
    ([key, item]) =>
      `$rebranded-border-radius-${kebabCase(key)}: ${item.value};`
  )
  .join("\n")}
`;
};
