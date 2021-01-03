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
    "semi": ["warn", "always"],
    "quotes": ["warn", "double", {"allowTemplateLiterals": true}],
    "no-multiple-empty-lines": ["warn", {"max": 1}],
    "indent": ["warn", 2]
  }
};