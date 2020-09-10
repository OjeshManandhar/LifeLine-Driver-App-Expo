module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            screens: './src/screens',
            navigator: './src/navigator',
            components: './src/components'
          }
        }
      ]
    ]
  };
};
