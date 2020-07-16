const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const nodeExternals = require('webpack-node-externals');

let config = {
    entry: "./src/js/",
    output: {
        path: path.join(__dirname, '/app/static/js')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue',
            'vue-router': 'vue-router/dist/vue-router',
        },
    },
}

module.exports = (env, argv) => {
    config.mode = argv.mode

    for (const key in config.resolve.alias) {
        if (config.resolve.alias.hasOwnProperty(key)) {
            config.resolve.alias[key] = config.resolve.alias[key] + (config.mode === 'production' ? '.min.js' : '.js')
        }
    }

    return config
};