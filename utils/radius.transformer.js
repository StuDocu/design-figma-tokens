const { kebabCase } = require("style-dictionary/lib/utils/es6_");

module.exports = function radiusTransformer(props) {
  return `// Rebrandaded border radius scale
${Object.entries(props.dictionary.properties)
  .filter(([key, item]) => item.type === "borderRadius")
  .map(
    ([key, item]) =>
      `$rebranded-border-radius-${kebabCase(key)}: ${item.value};`
  )
  .join("\n")}
`;
};
