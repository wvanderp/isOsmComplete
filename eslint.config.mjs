import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', 'gitBuild/**'],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            reactPlugin.configs['recommended-typescript'],
            reactPlugin.configs['disable-conflict-eslint-plugin-react-hooks'],
            reactHooks.configs.flat.recommended,
            jsxA11y.flatConfigs.recommended,
            sonarjs.configs.recommended,
            unicorn.configs['flat/recommended'],
            importX.flatConfigs.recommended,
            importX.flatConfigs.typescript,
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                sourceType: 'module',
            },
        },
        settings: {
            'import-x/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            // -------------------------------------------------------
            // Modern equivalents of eslint-config-airbnb core rules
            // -------------------------------------------------------
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-template': 'error',
            'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
            'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
            'arrow-body-style': ['error', 'as-needed'],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'eol-last': ['error', 'always'],

            // -------------------------------------------------------
            // Style — kept from original config
            // -------------------------------------------------------
            indent: ['error', 4, { SwitchCase: 1 }],
            'linebreak-style': 'off', // git handles line endings
            'comma-dangle': ['error', 'never'],
            'object-curly-spacing': 'off',
            'object-curly-newline': 'off',
            'max-len': ['error', {
                code: 120,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreStrings: true,
                ignoreRegExpLiterals: true,
            }],

            // -------------------------------------------------------
            // General JS — kept from original config
            // -------------------------------------------------------
            'no-unused-vars': 'off', // handled by @typescript-eslint/no-unused-vars
            'no-undef': 'warn',
            'no-underscore-dangle': 'off', // underscores denote private members
            'no-plusplus': 'off',
            'no-await-in-loop': 'off',
            'no-continue': 'off',
            camelcase: 'off',
            'no-use-before-define': 'off',
            'no-restricted-syntax': 'off',

            // -------------------------------------------------------
            // TypeScript ESLint
            // -------------------------------------------------------
            '@typescript-eslint/no-use-before-define': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',

            // -------------------------------------------------------
            // Import (import-x replaces eslint-plugin-import)
            // -------------------------------------------------------
            'import-x/extensions': 'off', // TypeScript does not want extensions

            // -------------------------------------------------------
            // JSX Accessibility
            // -------------------------------------------------------
            'jsx-a11y/click-events-have-key-events': 'off',

            // -------------------------------------------------------
            // Unicorn
            // -------------------------------------------------------
            'unicorn/filename-case': ['error', {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            }],
            'unicorn/no-null': 'off',
            'unicorn/prevent-abbreviations': ['error', {
                replacements: {
                    q: { query: true },
                    props: { properties: false },
                    params: { parameters: false },
                    pkg: { package: false },
                },
            }],
            'unicorn/prefer-node-protocol': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/numeric-separators-style': 'off',
            'unicorn/prefer-top-level-await': 'off',
            'unicorn/no-array-reduce': 'off',

            // -------------------------------------------------------
            // SonarJS
            // -------------------------------------------------------
            'sonarjs/no-duplicate-string': ['error', { threshold: 5 }],
        },
    },

    // Test file overrides
    {
        files: ['**/*Spec.ts', '**/*Spec.xts'],
        rules: {
            'prefer-arrow-callback': 'off',
            'func-names': 'off',
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },

    // Collect scripts — not production code, console is fine
    {
        files: ['collect/**/*'],
        rules: {
            'no-console': 'off',
        },
    },
);
