import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: ['node_modules/**', 'coverage/**', 'dist/**', 'build/**', 'gitBuild/**']
    },
    {
        files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            reactPlugin.configs['recommended-typescript'],
            reactPlugin.configs['disable-conflict-eslint-plugin-react-hooks'],
            reactHooks.configs.flat.recommended,
            sonarjs.configs.recommended,
            unicorn.configs['flat/recommended'],
            importX.flatConfigs.recommended,
            importX.flatConfigs.typescript
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021
            },
            parserOptions: {
                sourceType: 'module'
            }
        },
        settings: {
            'import-x/resolver': {
                typescript: {
                    alwaysTryTypes: true
                }
            }
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
            'linebreak-style': 'off', // Git handles line endings
            'comma-dangle': ['error', 'never'],
            'object-curly-spacing': 'off',
            'object-curly-newline': 'off',
            'max-len': ['error', {
                code: 120,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreStrings: true,
                ignoreRegExpLiterals: true
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
            // Unicorn
            // -------------------------------------------------------
            'unicorn/filename-case': ['error', {
                cases: {
                    camelCase: true,
                    pascalCase: true
                }
            }],
            'unicorn/no-null': 'off',
            'unicorn/prevent-abbreviations': ['error', {
                replacements: {
                    q: { query: true },
                    props: { properties: false },
                    params: { parameters: false },
                    pkg: { package: false }
                }
            }],
            'unicorn/prefer-node-protocol': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/numeric-separators-style': 'off',
            'unicorn/prefer-top-level-await': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/filename-case': 'off',
            'unicorn/prefer-https': 'off',

            // -------------------------------------------------------
            // SonarJS
            // -------------------------------------------------------
            'sonarjs/no-duplicate-string': ['error', { threshold: 5 }]
        }
    },

    // The config consumes plugin default exports according to their documented APIs.
    {
        files: ['eslint.config.{js,cjs,mjs,ts,cts,mts}'],
        rules: {
            'import-x/no-named-as-default': 'off',
            'import-x/no-named-as-default-member': 'off'
        }
    },

    // Test file overrides
    {
        files: ['**/*.{spec,test}.{ts,tsx,cts,mts}', '**/*{Spec,Test}.{ts,tsx,cts,mts}'],
        rules: {
            'prefer-arrow-callback': 'off',
            'func-names': 'off',
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-explicit-any': 'off'
        }
    },

    // Collect scripts — not production code, console is fine
    {
        files: ['collect/**/*'],
        languageOptions: {
            globals: {
                ...globals.node
            }
        },
        rules: {
            'no-console': 'off',
            'sonarjs/no-duplicate-string': 'off'
        }
    }
);
