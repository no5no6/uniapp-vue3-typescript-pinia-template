module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential', // 对于 Vue 3 项目
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 在这里添加或覆盖规则
    // 例如：'no-console': 'warn'
    'vue/multi-word-component-names': 0
    // '@typescript-eslint/no-explicit-any': 'off'
  }
}
