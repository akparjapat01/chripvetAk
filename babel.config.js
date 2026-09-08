// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'react-native-reanimated/plugin',
        // {
        //   relativeSourceLocation: true,
        // },
      ],
      ['module:react-native-dotenv', {moduleName: '@env', path: '.env'}],
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
        },
      ],
    ],
  };
};