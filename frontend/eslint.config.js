import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin'; // TypeScript ESLint 플러그인
import tsParser from '@typescript-eslint/parser'; // TypeScript 파서

export default {
  ignores: ['dist'], // dist 폴더 무시
  parser: tsParser, // TypeScript 파서 지정
  parserOptions: {
    project: './tsconfig.json', // TypeScript 설정을 참조하도록 설정
    tsconfigRootDir: __dirname, // tsconfig 위치 지정
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  extends: [
    js.configs.recommended,
    'plugin:@typescript-eslint/recommended', // TypeScript 추천 설정 확장
  ],
  env: {
    browser: true, // 브라우저 환경 글로벌 설정
    es6: true,
  },
  globals: globals.browser, // 브라우저 환경의 글로벌 변수
  plugins: [
    'react-hooks',
    'react-refresh',
    '@typescript-eslint', // TypeScript ESLint 플러그인 추가
  ],
  rules: {
    ...reactHooks.configs.recommended.rules, // React Hooks 규칙 추가
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/stories/**'], // stories 폴더 내에서는 devDependencies 허용
        optionalDependencies: false,
      },
    ],
    'react/react-in-jsx-scope': 'off', // React 17 이상에서 React import 강제 비활성화
    'no-unused-vars': 'off', // 기본 no-unused-vars 비활성화
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^React$' }, // 'React' 변수를 무시하도록 설정
    ],
  },
};
