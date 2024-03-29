# LifeLine-Driver-App

**NOT WORKING** any nore, don't know why. Removed node_modules/ to reinstall and it stopped working.

Driver app (LifeLine Driver App) for RATS (major project). Most of the codes are copy-pasted from **[LifeLine-App-Test](https://github.com/OjeshManandhar/LifeLine-App-Test)**
and **[LifeLine-App](https://github.com/OjeshManandhar/LifeLine-App)**.

**TESTED IN ANDROID ONLY**

## Notes

- **Running the app**

  - The codes upto the commit with tag [**bare-workflow**](https://github.com/OjeshManandhar/LifeLine-Driver-App/tree/bare-workflow) will work with

    `expo start`

  - Code later than this point is ejected from [**Managed Workflow**](https://docs.expo.io/introduction/managed-vs-bare/#managed-workflow) to [**Bare Workflow**](https://docs.expo.io/introduction/managed-vs-bare/#bare-workflow) so to run use following commands

    `yarn start` or `npx react-native start`

    `yarn android` or `npx react-native android`

- **Absolute Path**

  To add new absolute path, add the alias in _[babel.config.js](babel.config.js)_

  ```
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          utils: './src/utils',
          hooks: './src/hooks',
          global: './src/global',
          assets: './src/assets',
          context: './src/context',
          screens: './src/screens',
          dummy_api: './src/dummy_api',
          navigator: './src/navigator',
          components: './src/components'
        }
      }
    ]
  ]
  ```

- **Environment Variable**

  Use _[react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)_

- **React-Native-Paper Fonts**

  Pass an object in fonts like showh below, not just the font name as given in _[docs](https://callstack.github.io/react-native-paper/theming.html#customizing-all-instances-of-a-component)_

  ```
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: FontsList.regular }
  }
  ```

## Attribution

- [dead.png](src/assets/images/account/dead.png) - Icons made by [xnimrodx](https://www.flaticon.com/free-icon/dead_3538317?term=avatar&page=1&position=75) from [www.flaticon.com](https://www.flaticon.com/)
- _traffic_ used in [trafficMarker.png](src/assets/images/map/trafficMarker.png) - Icons made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/)
