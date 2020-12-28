const path = require('path');
const webpack = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    // set to development to read .env.local variables
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        // Adding fallback polyfills due to a breaking change in Webpack 5
        // Alternatively could have added an empty polyfill like {http: false}
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            // https://stackoverflow.com/questions/54459442/module-not-found-error-cant-resolve-child-process-how-to-fix
            "child_process": false,
            "fs": false,
            "zlib_bindings": false
        }
    },
    target: 'web',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
        global: true
    },
    // externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                // Need this for my version of modernizr
                // Solution modelled off of
                // https://github.com/webpack/webpack/issues/512
                // https://brian.olore.net/wp/2017/06/journey-to-webpack-2/
                test: /modernizr\.js$/,
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            wrapper: 'window'
                        }
                    }
                ]
            },
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        // Need this for Stripe specifically
        // https://stackoverflow.com/questions/41359504/webpack-bundle-js-uncaught-referenceerror-process-is-not-defined
        new webpack.ProvidePlugin({
          process: 'process/browser',
          // Resolves Buffer is not defined error
        // https://github.com/webpack/changelog-v5/issues/10
        Buffer: ['buffer', 'Buffer']
        })
      ]
};