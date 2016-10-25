/* eslint-disable import/no-extraneous-dependencies, no-console */
import { resolve } from 'path';
import { DefinePlugin, HotModuleReplacementPlugin, NamedModulesPlugin, NoErrorsPlugin } from 'webpack';

export const basePath = resolve(`${__dirname}/src`);
export const distributionPath = resolve(`${__dirname}/dist`);

const isDevEnvironment = environment => environment === 'dev';

export default function (options = {}) {
  const environment = options.prod ? 'production' : 'dev';

  console.log(`=> Building wordcloud for '${environment}' environment.`);

  const environmentConfigurations = isDevEnvironment ? {
    entry: [
      'webpack/hot/poll?1000',
      basePath,
    ],
    devtool: 'cheap-module-eval-source-map',
  } : {
    entry: basePath,
  };

  const environmentOutput = isDevEnvironment ? {
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
  } : {};

  const environmentPlugins = isDevEnvironment ? [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new NoErrorsPlugin(),
  ] : [];

  const fileName = environment === 'dev' ? 'wordcloud.dev.js' : 'wordcloud.js';

  return ({
    ...environmentConfigurations,
    devServer: { inline: true },
    target: 'node',
    output: {
      ...environmentOutput,
      path: distributionPath,
      filename: fileName,
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: ['babel', 'eslint'],
        },
      ],
    },
    plugins: [
      ...environmentPlugins,
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(environment),
        },
      }),
    ],
  });
}
