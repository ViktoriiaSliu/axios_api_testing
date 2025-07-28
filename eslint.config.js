import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import mochaPlugin from "eslint-plugin-mocha";

export default defineConfig([
  globalIgnores([".node_modules/", "reports/", "eslint.config.js", "mocha-runner.js"]),
  mochaPlugin.configs.recommended,
  { files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'prefer-const': 'warn',
    },
  },
]);
