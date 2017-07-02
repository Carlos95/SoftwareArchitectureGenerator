var path = require('path');
var webpack = require('webpack');
 
module.exports = {
		entry: {
	        importText: "./main.js",
	        behavioural: "./main2.js",
	        role: "./main3.js",
	        structuredText: "./main4.js" 
	    },
  output: { path: __dirname, filename: '[name].entry.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};