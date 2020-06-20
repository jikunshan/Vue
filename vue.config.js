const {resolve} = require('path');
module.exports = {
	publicPath:['production', 'prod'].includes(process.env.NODE_ENV) ? process.env.VUE_APP_PUBLIC_PATH : "./",
	outputDir: resolve(__dirname,'dist'),
	assetsDir: '',
	pages: {
		index: {
			entry: './src/main.js',
			template: './public/index.html',
			filename: 'index.html',
			title: 'Index Page'
		},
		subpage: 'src/main.js' /*注意这个是*/
	},
	lintOnSave: ['production', 'prod'].includes(process.env.NODE_ENV),
	runtimeCompiler: false,
	transpileDependencies: [ /* string or regex */ ],
	productionSourceMap: true,
	chainWebpack: config => {
	    config.module
	      .rule("images")
	      .use("image-webpack-loader")
	      .loader("image-webpack-loader")
	      .options({
	        mozjpeg: { progressive: true, quality: 65 },
	        optipng: { enabled: false },
	        pngquant: { quality: "65-90", speed: 4 },
	        gifsicle: { interlaced: false },
	        webp: { quality: 75 }
	      });
	},
	css:{
		loaderOptions:{
			sass:{
				data:'@import"@src/css/base.sass"'
			},
			css:{
				data:'@import"@src/css/base.css"'
			}
		}
	},
	parallel: require('os').cpus().length > 1,
	devServer: {
		host: '127.0.0.1',
		port:9001,
		proxy: {
			'/api': {
				target:  process.env.VUE_APP_HOST,
				changeOrigin: true,
				https: true,
				pathRewrite: function(path, req) {
					return path.replace('/api', '')
				},
				bypass: function(req, res, proxyOptions) {
					  if (req.url === '/'){
						  res.redirect('/login');
						  return true;
					  }
				 }
			}
		}
	}
}
