# Ogo!

## ♻️ Миграция

- Старые стили подключаются импортом в файле `src/assets/styles/migration.css` из папки
  `src/assets/styles/migration`
- Если есть конфликт старых стилей с новыми, то новый стиль нужно продублировать в файле
  `src/assets/styles/override.css` - после миграции файл можно будет просто удалить

##

## 🔥 Особенности

- используются препроцессоры [pug](https://pugjs.org/) и [SCSS](https://sass-lang.com/)
- используется [Webpack](https://webpack.js.org/) для сборки JavaScript-модулей

## 🛠 Установка

- Работает на [NodeJS](https://nodejs.org/en/) версии 20.17.0
- установите глобально:
  - [Yarn](https://yarnpkg.com/getting-started): `npm i -g yarn`
  - [Gulp](https://gulpjs.com/): `npm i -g gulp`
- скачайте сборку с помощью [Git](https://git-scm.com/downloads):
  `git clone https://github.com/ogo-int/ogo_clean.git`
- перейдите в скачанную папку со сборкой: `cd ogo_clean`
- введите `yarn set version stable`
- Yarn проверен на версии 4.7.0
- скачайте необходимые зависимости: `yarn`
- чтобы начать работу, введите команду: `yarn dev` или `yarn start` (режим разработки)
- чтобы собрать проект, введите команду `yarn build` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером. Режим
сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и
JS-файлов для загрузки на сервер.

## 📂 Файловая структура

```
ogo_clean
├── build
├── src
│   ├── brands
│   ├── assets
│   │   ├── favicon
│   │   ├── fonts
│   │   ├── images
│   │   ├── scripts
│   │   ├── styles
│   │   └── svg-sprites
│   ├── components
│   ├── data
│   ├── mocks
│   └── views
├── .babelrc
├── .browserslistrc
├── .env
├── .eslintrc
├── .gitignore
├── .prettierrc
├── .stylelintignore
├── .stylelintrc
├── .yarnrc
├── gulpfile.js
├── LICENCE
├── package.json
├── README.md
└── webpack.config.js
```

- Корень папки:

  - `.eslintignore` — запрет на отслеживание ESLint
  - `.eslintrc.json` — настройки ESLint
  - `.gitignore` – запрет на отслеживание файлов Git'ом
  - `.stylelintignore` – запрет на отслеживание файлов Stylelint'ом
  - `.stylelintrc.json` — настройки Stylelint
  - `.yarnrc.yml` – настройка Yarn
  - `gulpfile.babel.js` — настройки Gulp
  - `webpack.config.js` — настройки Webpack
  - `package.json` — список зависимостей

- Папка `src` - используется во время разработки:
  - Блоки и компоненты: `src/components`
  - Шрифты: `src/assets/fonts`
  - Изображения: `src/assets/images`
  - JS-файлы: `src/assets/scripts`
  - SCSS-файлы: `src/assets/styles`
  - JSON данные-заглушки: `src/data`
  - Шаблоны pug: `src/views`
  - Страницы сайта: `src/views/pages`
- Папка `build` - папка, из которой запускается локальный сервер для разработки (при
  запуске `yarn dev`)

## ⌨ Команды

- `yarn dev` - запуск сервера для разработки проекта
- `yarn build` - собрать проект с оптимизацией без запуска сервера
- `yarn run sprite`- собрать спрайты
- `yarn run build:styles` - скомпилировать SCSS-файлы
- `yarn run build:scripts` - собрать JS-файлы
- `yarn run lint:styles` - проверить scss файлы
- `yarn run lint:styles --fix` - исправить ошибки в SCSS-файлах согласно настройкам
  Stylelint
- `yarn run lint:scripts` - проверить JS-файлы
- `yarn run lint:scripts --fix` - исправить ошибки в JS-файлах согласно настройкам ESLint
  -->

## 💡 Рекомендации по использованию

### Компонентный подход к разработке сайтов

- каждый компонент имеет свою папку внутри `src/components`
- папка одного компонента содержит в себе один pug-файл, один SCSS-файл и один JS-файл
  (если у блока используется скрипт)
  - pug-файл компонента импортируется в файл `src/views/pages/[ваша страница].pug` или в
    необходимый файл компонента, откуда будет вызываться блок
  - SCSS-файлы компонентов импортируются в файл `src/styles/main.scss`
- Так же папка компонента может содержать внутренние _подкомпоненты_, например
  `/src/components/fields`

Пример структуры папки с компонентом:

```
src
├── components
│   ├── header
│   │   ├── header.pug
│   │   ├── header.js
│   │   ├── header.scss
```

### Страницы проекта

- страницы проекта находятся в папке `src/views/pages`
  - каждая страница (в том числе главная) наследует шаблон `src/views/layouts/default.pug`
  - главная страница: `src/views/index.pug`

### Мок-данные

- На проекте используется [msw](https://mswjs.io/)

- В режиме разработки запускается service worker, который перехватывает отправленные
  запросы
- В `.env` указаны переменные окружения с адресами для перехвата. Они глобально доступны
  для шаблонизатора и для вебпака с префиксом, например: `PROCESS.ENV.CATALOG_URL`
- Так что в шаблонах можно указывать ссылки на продакшн страницы

  ```pug
  a(href=PROCESS.ENV.COMPARE_URL) Ссылка

  ```

  Если есть обработчик, то запрос будет перехвачен.

- В `production` режиме `msw` не попадает в сборку. А `html` будет собран со значением
  переменной `<a href="/user/compare/">Ссылка</a>`
- В файле `/src/mocks/handlers/index.js` настроены обработчики запросов, например:

  ```javascript
  import { catalog } from "../resolvers/catalog.js"

  const DELAY = 500

  http.get(process.env.CATALOG_URL, async () => {
    await delay(DELAY)

    return HttpResponse.json(catalog, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
  })
  ```

### Шрифты

- шрифты находятся в папке `src/fonts` используйте
  [форматы](https://caniuse.com/#search=woff) `.woff` и `.woff2`
- шрифты подключаются в файл `srcsrc/assets/styles/base/_fonts.scss`
- сконвертировать локальные шрифты можно с
  помощью[данного сервиса](https://onlinefontconverter.com/)

### Изображения

- изображения находятся в папке `src/assets/images`
- изображение для генерации фавиконок должно находиться в папке
  `srcsrc/assets/img/favicon` и иметь размер не менее`1024px x 1024px`

### Настройка бутстрапа

- Сами модули и дефолтные настройки подключены в файле
  `src/assets/styles/vendor/_libs.css`
- Кастомизация переменных в файле `src/assets/styles/_settings.scss` - там под проект
  переопределены цвета, отступы и т.д.

### SVG-спрайты

Для создания спрайтов изображения `.svg` должны находиться в папке
`src/assets/svg-sprites/*`. Можно разделить иконки по разным папкам внутри `svg-sprites`,
тогда id иконки в спрайте будет с префиксом. Например `categories--icon-1`

Например, у нас для спрайта есть файлы `icon-1.svg`, `icon-2.svg` и `icon-3.svg`, и мы
должны обратиться к `icon-2.svg`. Для этого нужно воспользоваться тегом `use`:

```html
<svg><use xlink:href="/assets/img/sprites/sprite.svg#icon-2"></use></svg>
```

Изменить стили svg-иконки из спрайта в CSS:

```css
svg use {
  fill: red;
}
```

Бывает такая ситуация, когда стили иконки поменять не получается. Это связано с тем, что
при экспорте из Figma в svg добавляется лишний код. Например:

```html
<svg
  width="18"
  height="19"
  viewBox="0 0 18 19"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M4.90918 4.04542L13.091 9.54088L4.90918 14.9545L4.90918 4.04542Z"
    fill="#1B1B1D"
  />
</svg>
```

Нужно удалить `fill="none"` и `fill="#1B1B1D"`. Должно получиться так:

```html
<svg width="18" height="19" viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.90918 4.04542L13.091 9.54088L4.90918 14.9545L4.90918 4.04542Z" />
</svg>
```

### Сторонние библиотеки

- все сторонние библиотеки устанавливаются в папку `node_modules`

- для их загрузки воспользуйтеcь командой `yarn add package_name`
- для подключения JS-файлов библиотек импортируйте их в самом начале JS-файла компонента

```javascript
import $ from "jquery"
```

- Все плагины из `node_modules` которые были импортированы в компоненты и плагины из папки
  `src/assets/scripts/plugins` собираются вебпаком в файл `plugins.js`

- Стили библиотек, плагинов, модули бутстрапа подключены в файле
  `src/assets/styles/vendor/_libs.css`, там же они и настраиваются
- JS-файлы и стилевые файлы библиотек самостоятельно изменять не нужно
