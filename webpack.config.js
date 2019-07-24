"use strict";

var path = require("path");
var plugins = [];

module.exports = {
	devtool: "source-map",
	devServer: {
		contentBase: "./"
	},
	entry: ["babel-polyfill", "pixi.js", "./src/index.js"],
	optimization: {
		minimize: true
	},
	output: {
		filename: "game.js"
	},
  	resolve: {
    	extensions: [".json", ".js"]
  	},
	plugins: plugins,
	mode: "production",
	module: {
		rules: [
			{
				enforce: "pre",
				include: path.resolve(__dirname, "node_modules/pixi.js"),
        		loader: "transform-loader/cacheable?brfs"
      		},
			{
				test: /\.json$/,
				include: path.resolve(__dirname, "node_modules/pixi.js"),
				loader: "json",
			},
			{
				test: /\.js$/,
				exclude: path.resolve(__dirname, "node_modules"),
				loader: "babel-loader",
        		query: {
          			presets: ["es2015", "stage-0"]
        		}
			}
		]
	}
};
