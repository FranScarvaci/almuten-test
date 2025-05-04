# 📊 Almuten Test

Este proyecto utiliza [`almuten-scraper`](https://www.npmjs.com/package/almuten-scraper) para generar información astrológica a partir de datos de nacimiento, y traduce automáticamente los resultados del chino al español.

---

## 📦 Requisitos

- Node.js `>=18`
- npm

---

## 📁 Instalación

```bash
npm install
```

Si no instalaste el proyecto aún, asegurate de clonar y luego ejecutar:

```bash
git clone <repo-url>
cd almuten-test
npm install
```

---

## 📚 Dependencias principales

```bash
npm install almuten-scraper ts-node typescript web-streams-polyfill
```

---

## 🧠 Estructura

- `index.ts`: script principal que ejecuta el scraper y traduce los resultados del chino al español.
- `package.json`: configuraciones de ejecución.
- `tsconfig.json`: configuración de TypeScript.

---

## ▶️ Cómo ejecutar el script

Ejecutá el siguiente comando:

```bash
npm run start
```

Esto corre el archivo `src/index.ts` usando `ts-node` con soporte para ESM y pollyfills necesarios.

---

## 🔧 Scripts disponibles

```json
// package.json
"scripts": {
  "start": "node --loader ts-node/esm src/index.ts"
}
```

---

## 📝 Notas

- Si aparece el error `ReferenceError: ReadableStream is not defined`, el código ya incluye un *polyfill* automático.
- El script toma los datos de nacimiento desde una constante llamada `birthInfo` que podés modificar fácilmente.