# Language App

Кроссплатформенное приложение для изучения языков, созданное на:

* Expo
* React Native
* React Native Web
* TypeScript
* Zustand

Поддерживаемые платформы:

* iOS
* Android
* Web

---

# Установка

Установить зависимости:

```bash
npm install
```

---

# Запуск в режиме разработки

Запуск Expo:

```bash
npm start
```

Запуск веб-версии:

```bash
npm run web
```

---

# Сборка веб-версии

Добавьте в `package.json` следующие скрипты:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",

    "build:web": "expo export --platform web",
    "serve:web": "npx serve dist"
  }
}
```

---

# Production сборка

Создать production build для веба:

```bash
npm run build:web
```

После сборки статические файлы появятся в папке:

```txt
dist/
```

---

# Локальный запуск production сборки

```bash
npm run serve:web
```

---

# Деплой

Проект можно разместить на:

* Railway
* Vercel
* Netlify
* Cloudflare Pages

---

# Деплой на Railway

## Build Command

```bash
npm install && npm run build:web
```

## Start Command

Оставить пустым.

## Output Directory

```txt
dist
```

---

# Деплой на Cloudflare Pages

## Framework preset

```txt
None
```

## Build command

```bash
npm install && npm run build:web
```

## Build output directory

```txt
dist
```

---

# Деплой на Vercel

## Framework preset

```txt
Other
```

## Build command

```bash
npm run build:web
```

## Output directory

```txt
dist
```

---

# Используемые технологии

* Expo SDK 55
* React 19
* React Native 0.83
* React Native Web
* Zustand
* TypeScript
