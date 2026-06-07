import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: globals.node,
    },
    extends: [js.configs.recommended],
  },

  ...tseslint.configs.recommended,
]);
