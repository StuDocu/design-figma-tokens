const kebabCase = require('lodash.kebabcase');

module.exports = function spacingTransformer(props) {
    return Object.entries(props.dictionary.properties)
        .reduce(
            (output, [key, value]) => {
                if (value.type !== 'spacing') {
                    return output;
                }

                const { value: itemValue } = value;

                return [
                    ...output,

                    // Goes through each spacing scale definition and sets the variable
                    `$rebranded-spacing-${kebabCase(key)}: ${itemValue};`,
                ];
            },
            ['// Rebranded spacing scale tokens']
        )
        .join('\n');
};
