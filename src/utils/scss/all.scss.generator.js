const glob = require('glob');
const path = require('path');

module.exports = {};
module.exports.generateAllMixinsFile = function generateAllMixinsFile() {
    const content = glob
        .sync(path.join(__dirname, '..', '..', '..', 'mixins', '*.scss'))
        .reduce((output, filePath) => {
            const fileToImport = path.basename(filePath, '.scss');
            if (fileToImport === 'all') {
                return output;
            }
            return output.concat([`@import './${fileToImport.substring(1)}';`]);
        }, [])
        .join('\n');

    return content;
};

module.exports.generateAllVariablesFile = function generateAllVariablesFile() {
    const content = glob
        .sync(path.join(__dirname, '..', '..', '..', 'variables', '*.scss'))
        .reduce((output, filePath) => {
            const fileToImport = path.basename(filePath, '.scss');
            if (fileToImport === 'all') {
                return output;
            }
            return output.concat([`@import './${fileToImport.substring(1)}';`]);
        }, [])
        .join('\n');

    return content;
};
