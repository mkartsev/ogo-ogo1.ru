"use strict"

// import newer from "gulp-newer"
// import rename from "gulp-rename"
import { deleteAsync } from "del"
import * as dartSass from "sass"
import * as fs from "node:fs"
import autoprefixer from "gulp-autoprefixer"
import browsersync from "browser-sync"
import cached from "gulp-cached"
import changed from "gulp-changed"
import cheerio from "gulp-cheerio"
import data from "gulp-data"
import debug from "gulp-debug"
import favicons from "gulp-favicons"
import groupmedia from "gulp-group-css-media-queries"
import gulp from "gulp"
import gulpif from "gulp-if"
import gulpSass from "gulp-sass"
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin"
import merge from "gulp-merge-json"
import mincss from "gulp-clean-css"
import path from "path"
import plumber from "gulp-plumber"
import postcss from "gulp-postcss"
import prefixer from "postcss-prefix-selector"
import prettier from "gulp-prettier"
import pug from "gulp-pug"
import replace from "gulp-replace"
import sourcemaps from "gulp-sourcemaps"
import svgmin from "gulp-svgmin"
import svgSprite from "gulp-svg-sprite"
import webpack from "webpack"
import webpackConfig from "./webpack.config.js"
import webpackStream from "webpack-stream"

const paths = {
  migration: {
    styles: {
      src: ["./src/assets/styles/migration.css", "./src/assets/styles/override.css", "./src/assets/styles/migration/**/*.css"],
      build: "./build/assets/css/"
    },
    scripts: {
      src: "./src/assets/scripts/migration/*.js",
      build: "./build/assets/js/migration"
    },
    vendor: {
      src: "./src/assets/scripts/migration/vendor/**/*",
      build: "./build/assets/js/migration/vendor"
    }
  },
  data: {
    src: "./src/data/**/*",
    build: "./build/data/"
  },
  views: {
    src: ["./src/views/index.pug", "./src/views/pages/**/*.pug", "!./src/views/pages/_page.pug"],
    build: "./build/",
    watch: ["./src/components/**/*.pug", "./src/views/**/*.pug"],
  },
  styles: {
    src: "./src/assets/styles/main.{scss,sass}",
    build: "./build/assets/css/",
    watch: ["./src/components/**/*.{scss,sass}", "./src/assets/styles/**/*.{scss,sass}"],
  },
  mock: {
    src: ["./src/mockServiceWorker.js"],
    build: "./build/"
  },
  scripts: {
    src: ["./src/**/*.js"],
    build: "./build/assets/js/",
    watch: ["./src/index.js", "./src/assets/scripts/**/*.js", "./src/components/**/*.js", "./src/mocks/**/*.js"],
  },
  images: {
    src: ["./src/assets/images/**/*.{jpg,jpeg,png,gif,tiff,svg}"],
    build: "./build/assets/img/",
    watch: "./src/assets/images/**/*.{jpg,jpeg,png,gif,tiff,svg}",
  },
  sprites: {
    src: "./src/assets/svg-sprites/**/*.svg",
    build: "./build/assets/img/sprites/",
    watch: "./src/assets/svg-sprites/**/*.svg",
  },
  fonts: {
    src: "./src/assets/fonts/**/*.{woff,woff2,eot,ttf,svg}",
    build: "./build/assets/fonts/",
    watch: "./src/assets/fonts/**/*.{woff,woff2,eot,ttf,svg}",
  },
  favicons: {
    src: "./src/assets/favicon/*.{jpg,jpeg,png,gif,tiff,ico}",
    build: "./build/assets/img/favicons/",
  },
  brands: {
    views: "./src/brands/**/*.pug",
    fonts: "./src/brands/**/fonts/*.{eot,ttf,woff,woff2,svg}",
    styles: "./src/brands/**/*.css",
    images: "./src/brands/**/*.{jpg,jpeg,png,gif,tiff,svg}",
    scripts: "./src/brands/**/*.js",
    build: "./build/brands"
  },
}

const isProduction = process.env.NODE_ENV === "production" ? true : false

const sass = gulpSass(dartSass)

const mockWorker = () => {
  return gulp
    .src(paths.mock.src)
    .pipe(
      plumber({
        errorHandler: function () {
          this.emit("end")
        },
      })
    )
    .pipe(gulp.dest(paths.mock.build))
    .pipe(plumber.stop())
    .pipe(browsersync.stream())
}

// Старые стили будут в сборке в файле assets/css/migration.css
const stylesMigration = () => {
  return gulp
    .src(paths.migration.styles.src, { base: "./src/assets/styles/" })
    .pipe(gulp.dest(paths.migration.styles.build))
    .pipe(
      debug({
        title: "Styles migration",
      })
    )
    .on("end", browsersync.reload)
}

// Старые скрипты будут в сборке в файле assets/js/migration.js
const scriptsMigration = () => {
  return gulp
    .src(paths.migration.scripts.src)
    .pipe(
      plumber({
        errorHandler: function () {
          this.emit("end")
        },
      })
    )
    .pipe(changed(paths.migration.scripts.build))
    .pipe(gulp.dest(paths.migration.scripts.build))
    .pipe(plumber.stop())
    .pipe(
      debug({
        title: "Scripts migration",
      })
    )
    .pipe(browsersync.stream())
}

// Старые плагины будут копироваться в папку assets/js/vendor
const vendorMigration = () => {
  return gulp
    .src(paths.migration.vendor.src)
    .pipe(
      plumber({
        errorHandler: function () {
          this.emit("end")
        },
      })
    )
    .pipe(changed(paths.migration.vendor.build))
    .pipe(gulp.dest(paths.migration.vendor.build))
    .pipe(plumber.stop())
    .pipe(
      debug({
        title: "Vendor migration",
      })
    )
    .pipe(browsersync.stream())
}

const brandsViews = () => {
  return gulp
    .src(paths.brands.views)
    .pipe(plumber())
    .pipe(data(function () {
      return JSON.parse(fs.readFileSync("./temp/data.json"))
    }))
    .pipe(
      pug({
        doctype: "html",
        basedir: "/"
      })
    )
    .pipe(cached("pug"))
    .pipe(prettier({
      bracketSpacing: true,
      endOfLine: "auto",
      htmlWhitespaceSensitivity: "ignore",
      proseWrap: "preserve",
      quoteProps: "consistent",
      tabWidth: 2,
      semi: true,
      trailingComma: "es5",
      printWidth: 256,
      bracketSameLine: true
    }))
    .pipe(gulp.dest(paths.brands.build))
    .pipe(
      debug({
        title: "Brands views",
      })
    )
    .pipe(browsersync.stream())
}
const brandsImages = () => {
  return gulp
    .src(paths.brands.images)
    .pipe(plumber())
    .pipe(changed(paths.brands.build))
    .pipe(
      gulpif(
        isProduction,
        imagemin([
          gifsicle({
            optimizationLevel: 3,
            optimize: 3,
            lossy: 2,
          }),
          optipng({
            speed: 5,
            quality: [0.6, 0.8],
          }),
          mozjpeg({
            progressive: true,
            quality: 90,
          }),
          svgo({
            plugins: [
              { name: "removeViewBox", active: true },
              { name: "cleanupIDs", active: false },
              { name: "removeRasterImages", active: true },
              { name: "removeUnusedNS", active: false },
              { name: "removeUselessStrokeAndFill", active: false },
              { name: "removeComments", active: true },
              { name: "removeEmptyAttrs", active: true },
              { name: "removeEmptyText", active: true },
              { name: "collapseGroups", active: true }
            ],
          }),
        ])
      )
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.brands.build))
    .pipe(
      debug({
        title: "Brands images",
      })
    )
    .pipe(browsersync.stream())
}
const brandsStyles = () => {
  return gulp
    .src(paths.brands.styles)
    .pipe(gulp.dest(paths.brands.build))
    .pipe(
      debug({
        title: "Brands styles",
      })
    )
    .on("end", browsersync.reload)
}
const brandsFonts = () => {
  return gulp
    .src(paths.brands.fonts)
    .pipe(gulp.dest(paths.brands.build))
    .pipe(
      debug({
        title: "Brands fonts",
      })
    )
    .on("end", browsersync.reload)
}
const brandsScripts = () => {
  return gulp
    .src(paths.brands.scripts)
    .pipe(
      plumber({
        errorHandler: function () {
          this.emit("end")
        },
      })
    )
    .pipe(gulp.dest(paths.brands.build))
    .pipe(plumber.stop())
    .pipe(
      debug({
        title: "Brands scripts",
      })
    )
    .pipe(browsersync.stream())
}

const clean = () => {
  return deleteAsync(["./build/*"])
}

const copyData = () => {
  return gulp
    .src(paths.data.src)
    .pipe(gulp.dest(paths.data.build))
    .pipe(browsersync.stream())
}

const pugData = () => {
  return gulp.src(paths.data.src)
    .pipe(merge({
      fileName: "data.json",
      edit: (json, file) => {
        // Extract the filename and strip the extension
        var filename = path.basename(file.path),
          primaryKey = filename.replace(path.extname(filename), "")

        // Set the filename as the primary key for our JSON data
        var data = {}
        data[primaryKey.toLowerCase()] = json

        return data
      }
    }))
    .pipe(gulp.dest("./temp"))
}

const views = () => {
  return gulp
    .src(paths.views.src)
    .pipe(plumber())
    .pipe(data(function () {
      return JSON.parse(fs.readFileSync("./temp/data.json"))
    }))
    .pipe(
      pug({
        doctype: "html",
        basedir: "/"
      })
    )
    .pipe(cached("pug"))
    .pipe(prettier({
      bracketSpacing: true,
      endOfLine: "auto",
      htmlWhitespaceSensitivity: "ignore",
      proseWrap: "preserve",
      quoteProps: "consistent",
      tabWidth: 2,
      semi: true,
      trailingComma: "es5",
      printWidth: 256,
      bracketSameLine: true
    }))
    .pipe(gulp.dest(paths.views.build))
  // .pipe(browsersync.stream())
}

const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(
      plumber({
        errorHandler: function () {
          this.emit("end")
        },
      })
    )
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulpif(isProduction, groupmedia()))
    .pipe(plumber.stop())
    .pipe(
      gulpif(
        isProduction,
        postcss([
          prefixer({
            prefix: "[data-theme='ogo-clean']",
            // exclude: ["a"],
            transform: function (prefix, selector, prefixedSelector) { // (prefix, selector, prefixedSelector, filePath, rule)
              if (selector === ":root") {
                return selector
              } else if (selector === "body") {
                return "body" + prefix
              } else if (selector === "html") {
                return "html" + prefix
              } else if (selector === "a") {
                return selector
              } else if (selector === "a:hover") {
                return selector
              } else if (selector === "a:not([href]):not([class])") {
                return selector
              } else if (selector === "a:not([href]):not([class]):hover") {
                return selector
              } else {
                return prefixedSelector
              }
            }
          })
        ])
      )
    )
    .pipe(
      gulpif(
        isProduction,
        autoprefixer({
          cascade: false,
          grid: true,
        })
      )
    )
    .pipe(
      gulpif(
        isProduction,
        mincss({
          compatibility: "ie11",
          level: {
            1: {
              specialComments: 0,
              removeEmpty: true,
              removeWhitespace: true,
            },
            2: {
              mergeMedia: true,
              removeEmpty: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: false,
            },
          },
        })
      )
    )
    .pipe(gulpif(!isProduction, sourcemaps.write("./maps/")))
    .pipe(gulp.dest(paths.styles.build))
    .pipe(
      debug({
        title: "CSS files",
      })
    )
  // .on("end", browsersync.reload)
}

const images = () => {
  return gulp
    .src(paths.images.src)
    .pipe(plumber())
    .pipe(changed(paths.images.build))
    // .pipe(newer(paths.images.build))
    .pipe(
      gulpif(
        isProduction,
        imagemin([
          gifsicle({
            optimizationLevel: 3,
            optimize: 3,
            lossy: 2,
          }),
          optipng({
            speed: 5,
            quality: [0.6, 0.8],
          }),
          mozjpeg({
            progressive: true,
            quality: 90,
          }),
          svgo({
            plugins: [
              { name: "removeViewBox", active: true },
              { name: "cleanupIDs", active: false },
              { name: "removeRasterImages", active: true },
              { name: "removeUnusedNS", active: false },
              { name: "removeUselessStrokeAndFill", active: false },
              { name: "removeComments", active: true },
              { name: "removeEmptyAttrs", active: true },
              { name: "removeEmptyText", active: true },
              { name: "collapseGroups", active: true }
            ],
          }),
        ])
      )
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.images.build))
    .pipe(
      debug({
        title: "Images",
      })
    )
    .pipe(browsersync.stream())
}

const favicon = () => {
  return gulp
    .src(paths.favicons.src)
    .pipe(plumber())
    .pipe(
      favicons({
        icons: {
          appleIcon: true,
          favicons: true,
          online: false,
          appleStartup: false,
          android: false,
          firefox: false,
          yandex: false,
          windows: false,
          coast: false,
        },
      })
    )
    .pipe(gulp.dest(paths.favicons.build))
    .pipe(
      debug({
        title: "Favicons",
      })
    )
}

const sprite = () => {
  return gulp
    .src(paths.sprites.src)
    .pipe(plumber())
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill")
          $("[stroke]").removeAttr("stroke")
          $("[style]").removeAttr("style")
          $("[title]").removeAttr("title")
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace("&lt", "<"))
    .pipe(replace("&gt", ">"))
    .pipe(
      svgSprite({
        shape: {
          id: {
            whitespace: "-", // Whitespace replacement for shape IDs
          },
          dest: "intermediate-svg",
          dimension: {
            attributes: false, // Width and height attributes on embedded shapes
          },
          spacing: {
            box: "border", // Padding strategy (similar to CSS `box-sizing`)
          },
        },
        mode: {
          symbol: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest(paths.sprites.build))
    .pipe(
      debug({
        title: "Sprites",
      })
    )
    .on("end", browsersync.reload)
}

const scripts = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(
      plumber({
        errorHandler: function () {
          this.emit("end")
        },
      })
    )
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(paths.scripts.build))
    .pipe(plumber.stop())
    .pipe(
      debug({
        title: "JS files",
      })
    )
    .pipe(browsersync.stream())
}

const fonts = () => {
  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.build))
    .pipe(
      debug({
        title: "Fonts",
      })
    )
}

const server = () => {
  browsersync.init({
    ui: false,
    notify: false,
    host: "localhost",
    open: true,
    cors: true,
    port: 3000,
    server: {
      baseDir: "build",
    },
  })
}

const watch = () => {
  gulp.watch(paths.views.watch, gulp.series(views, refresh))
  gulp.watch(paths.styles.watch, gulp.series(styles, refresh))
  gulp.watch(paths.scripts.watch, gulp.series(scripts, refresh))

  gulp.watch(paths.images.src, gulp.series(images, refresh))
  gulp.watch(paths.favicons.src, gulp.series(favicon, refresh))
  gulp.watch(paths.sprites.src, gulp.series(sprite, refresh))
  gulp.watch(paths.fonts.src, gulp.series(fonts, refresh))
  gulp.watch(paths.data.src, gulp.series(copyData, pugData, gulp.parallel(views, brandsViews), refresh))

  gulp.watch(paths.brands.views, gulp.series(brandsViews, refresh))
  gulp.watch(paths.brands.styles, gulp.series(brandsStyles, refresh))
  gulp.watch(paths.brands.images, gulp.series(brandsImages, refresh))
  gulp.watch(paths.brands.fonts, gulp.series(brandsFonts, refresh))
  gulp.watch(paths.brands.scripts, gulp.series(brandsScripts, refresh))

  gulp.watch(paths.migration.styles.src, gulp.series(stylesMigration, refresh))
  gulp.watch(paths.migration.scripts.src, gulp.series(scriptsMigration, refresh))
  gulp.watch(paths.migration.vendor.src, gulp.series(vendorMigration, refresh))
}

const refresh = (done) => {
  browsersync.reload()
  done()
}

const build = (done) => {
  gulp.series(
    clean,
    copyData,
    mockWorker,
    sprite,
    gulp.parallel(favicon, images, fonts, scripts, brandsFonts, brandsScripts, brandsImages, scriptsMigration, vendorMigration),
    gulp.parallel(styles, brandsStyles, stylesMigration),
    gulp.series(pugData, gulp.parallel(views, brandsViews))
  )(done)
}

const dev = () => {
  gulp.series(build, gulp.parallel(watch, server))()
}

export { dev as default, copyData, build, sprite, scripts, styles }

// export default gulp.series(clean, data, mockWorker, sprite, gulp.parallel(favicon, images, fonts, scripts, brandsFonts, brandsScripts, brandsImages, scriptsMigration, vendorMigration), gulp.parallel(styles, brandsStyles, stylesMigration), gulp.parallel(views, brandsViews), gulp.parallel(watch, server))
