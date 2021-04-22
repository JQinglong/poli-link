module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'prettier/prettier': 'error'
  }
}
