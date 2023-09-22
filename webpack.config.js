/*
 * @Author: mikey.v_boofeng 
 * @Date: 2021-12-29 15:46:41 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-12-30 15:01:29
 * 以下是webpack 必须配置
 */
//引入包
const path = require("path");

//自动生成html插件并且自动引入相关资源
const HTMLWebPackPlugin = require("html-webpack-plugin")

//构建时清空dist文件下所有的文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

//webpack配置信息
module.exports = {
  mode: 'production',
  //指定入口文件
  entry: './src/index.ts',
  //打包文件所在的路径
  output: {
    //指定打包的文件目录
    path: path.resolve(__dirname, "dist"),
    //打包后的文件名
    filename: 'bundle.js',

    //告诉webpack 不使用箭头函数、const  是为了兼容IE浏览器
    environment: {
      arrowFunction: false,
      const:false
    }
  },
  //找指定webpack打包时使用的模块
  module: {
    //指定规则
    rules: [
      {
        //test指定的是规则生效的文件
        test: /\.ts$/,
        //使用loader
        use: [
          //配置babel
          {
            //配置指定加载器
            loader: 'babel-loader',
            //设置babel
            options: {
              //设置预定义的环境
              presets: [
                [
                  //指定环境插件
                  '@babel/preset-env',
                  //配置信息
                  {
                    //要兼容的浏览器
                    targets: {
                      'chrome': "88",
                      'ie': '11'
                    },
                    //指定corejs版本
                    corejs: '3',
                    //使用corejs方式 usage表示按需加载
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        //排除的文件夹
        exclude: /node-modules/
      },

      //设置less文件处理
      {
        test: /.\less$/,
        use: [ //从下往上执行 
          'style-loader',
          'css-loader',
          //引入postcss  解决样式兼容问题
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 version'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },

  //配置webpack插件
  plugins: [
    new HTMLWebPackPlugin({
      // title:"typeScript【自定义标题】"
      template: './src/index.html' //以路劲下的模板在dist生成对应的html
    }),
    new CleanWebpackPlugin()
  ],

  //用来设置模块化引用 
  resolve: {
    extensions: ['.ts', '.js']
  }

}