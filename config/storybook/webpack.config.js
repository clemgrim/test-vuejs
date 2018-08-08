module.exports = (defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          prettierConfig: {
            printWidth: 80,
            singleQuote: false,
          }
        }
      }
    ],
    enforce: 'pre',
  },);

  return defaultConfig;
}