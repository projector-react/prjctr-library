
module.exports = {
    parser: "@typescript-eslint/parser",
    ignorePatterns: [".eslintrc.js"],
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "plugin:import/typescript",
        "airbnb",
        "airbnb/hooks"
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["@typescript-eslint", "prettier", "import"],
    env: {
        browser: true,
        node: false,
        es2021: true,
        jest: true
    },
    rules: {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "arrow-parens": [0],
        "import/prefer-default-export": [0],
        "import/extensions": [0],
        "react/function-component-definition": [0],
        "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
        "react/prop-types": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/require-default-props": "off",
        "react/destructuring-assignment": "off",
        "react/jsx-boolean-value": "off",
        "prettier/prettier": ["error"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "comma-dangle": ["error", "never"],
        "react/react-in-jsx-scope": "off",
        "object-curly-newline": ["error", {
            "ObjectExpression": "always",
            "ObjectPattern": { "multiline": true },
            "ImportDeclaration": "never",
            "ExportDeclaration": { "multiline": true, "minProperties": 3 }
        }],
        "camelcase": ["error", { "ignoreDestructuring": true } ],
        "implicit-arrow-linebreak": ["error", "below"],
    },
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx", ".js"]
        },
        "import/resolver": {
            // use <root>/tsconfig.json
            typescript: {},
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
}
