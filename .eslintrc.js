module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "parser": "babel-eslint",
  "plugins": [
      "react"
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "no-multiple-empty-lines": ["error", {"max": 1}],
    "indent": ["error", 2]
  }
};