import path from "path"
import { fileURLToPath } from "url"
import * as dotenv from "dotenv"
import webpack from "webpack"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = process.env.NODE_ENV === "production"
const env = dotenv.config()

export default {
  mode: isProduction ? "production" : "development",
  entry: {
    main: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/assets/js/",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: path.resolve("node_modules"),
          name: "plugins",
          chunks: "all"
        },
        custom: {
          test: path.resolve("src/assets/scripts/plugins"),
          name: "plugins",
          chunks: "all"
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: require.resolve("./node_modules/fullcalendar/main.js"),
      //   loader: "exports-loader", // exports-loader надо установить
      //   options: {
      //     exports: "default FullCalendar",
      //   },
      // },
    ]
  },

  externals: process.env.NODE_ENV === "production" ? {
    jquery: "jQuery",
  } : {},

  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        ...env.parsed,
        NODE_ENV: process.env.NODE_ENV || "development",
        ENABLE_MOCK_API: process.env.ENABLE_MOCK_API || "false",
      }),
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@scripts": path.resolve(__dirname, "src/assets/scripts")
    },
    modules: [
      path.resolve(__dirname),
      "node_modules"
    ]
  }
}
