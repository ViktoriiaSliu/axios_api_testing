import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import mochaPlugin from "eslint-plugin-mocha";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores([".node_modules/", "reports/", "eslint.config.js", "mocha-runner.js"]),
  mochaPlugin.configs.recommended,
  eslintConfigPrettier,
  { files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'prefer-const': 'warn',
      'no-unexpected-multiline': 'off',
      'no-unused-expressions': 'off',
    },
  },
]);
