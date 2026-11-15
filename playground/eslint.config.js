// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs, configureVueProject } from '@vue/eslint-config-typescript';
import prettierConfig from '@vue/eslint-config-prettier';

const __dirname = dirname(fileURLToPath(import.meta.url));

configureVueProject({
  scriptLangs: ['ts', 'js'],
  rootDir: __dirname,
});

const parserOptionsConfig = {
  name: 'parser-options',
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: __dirname,
    },
  },
};

const customRules = {
  name: 'custom-rules',
  rules: {
    'vue/no-mutating-props': [
      'error',
      {
        shallowOnly: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
};

export default defineConfigWithVueTs(
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  parserOptionsConfig,
  customRules,
  prettierConfig,
);
