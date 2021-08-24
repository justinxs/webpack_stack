module.exports = {
    output: {
      filename: 'bundle.js',
    },
};

module.exports = {
    entry: {
        app: './src/app.js',
        search: './src/search.js',
    },
    output: {
        filename: '[name].js',
        path: '[name]_[chunkhash:8].js',
    },
};