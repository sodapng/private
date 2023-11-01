const {
    configure,
    presets
} = require("eslint-kit");

module.exports = configure({
    allowDebug: process.env.NODE_ENV !== "production",

    presets: [
        presets.imports(),
        presets.node(),
        presets.prettier(),
        presets.typescript(),
        presets.react()
    ],
    extend: {
        plugins: ['react-refresh'],
        rules: {
          'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
          ],
        },
    }
});