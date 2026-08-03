# Calendar

Компактный календарный компонент на Vue 2 с выбором даты, навигацией по месяцам и переключением русского и английского интерфейса.

## Возможности

- сетка из 42 ячеек с днями соседних месяцев;
- переход к предыдущему и следующему месяцу;
- выделение текущего и выбранного дня;
- переключение локали RU/EN;
- начальная дата через prop `nachalnayaData`;
- событие `vybrannaya-data` в формате `YYYY-MM-DD`;
- статическая production-сборка для Vercel.

## Стек

- Vue 2;
- JavaScript;
- Webpack 5 и Vue Loader;
- CSS Grid;
- Vercel Static Build.

## Локальный запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:8080`.

## Production-сборка

```bash
npm run build
```

Результат создаётся в директории `dist/`.

## Интеграция компонента

```vue
<Calendar
  nachalnaya-data="2026-08-03"
  @vybrannaya-data="handleDateSelect"
/>
```

Автоматизированных тестов в текущей версии нет. Рабочая проверка проекта — production-сборка и ручная проверка навигации, выбора даты и обеих локалей.

## Структура

- `src/Calendar.vue` — календарная сетка, состояние и локализация;
- `src/main.js` — подключение компонента и обработка выбранной даты;
- `webpack.config.js` — development server и production bundle;
- `vercel.json` — конфигурация статического deployment.
