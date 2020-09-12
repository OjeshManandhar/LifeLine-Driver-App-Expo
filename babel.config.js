module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    },
    plugins: [
      ['module:react-native-dotenv'],
      [
        'module-resolver',
        {
          alias: {
            utils: './src/utils',
            hooks: './src/hooks',
            global: './src/global',
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
