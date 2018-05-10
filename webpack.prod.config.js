/*	eslint import/no-extraneous-dependencies:0	*/
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const fs = require("fs");

const nodeModules = {};
fs
	.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => (nodeModules[mod] = `commonjs ${mod}`));

module.exports = {
	context: `${__dirname}/src/`,
	target: "node",
	mode: "production",
	externals: nodeModules,
	entry: ['babel-polyfill', `${__dirname}/src/js/index.js`],
	output: {
		path: `${__dirname}/build/`,
		publicPath: "/build/",
		filename: "main.min.js"
	},
	module: {
		rules: [
			{
				test: /\.json$/,
				use: "json-loader"
			},
			{
				test: /\.js$/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([`${__dirname}/build/`]),
		new CopyWebpackPlugin([
		])//,
		//new UglifyJSPlugin({
		//	minimize: true,
		//	output: {
		//		comments: false
		//	}
		//})
	]
};
