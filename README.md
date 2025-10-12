
---

Creamos un proyecto de react, para hacerlo más ligero lo hacemos mediante [vite](https://vite.dev/):

```bash
npm create vite@latest
```

---
## Instalando GSAP para Animaciones 🎨 

Después de crear el proyecto, el siguiente paso es instalar las **dependencias clave** que usaremos para las animaciones y el manejo de *media queries*: **GSAP** y **react-responsive**. Ejecuta esta línea para instalar todas las dependencias necesarias:

```bash
npm install gsap @gsap/react react-responsive
```

### Preparando el Entorno 
Antes de continuar, es una buena práctica dejar limpio el proyecto. Por ello, te recomendamos: 

1. Eliminar el contenido de las carpetas y archivos que no utilizaremos: 
	* `assets` 
	* `App.jsx`
	* `App.css`
	* `index.css` 

Ahora en el archivo de `App.jsx`haremos un **rafce**, para crear la estructura basica de un componente de React, si tenemos desplegado el proyecto y lo vemos, deberia de aparecer un texto que pone "App" en un fondo blanco

---

## Instalando Tailwind CSS en Vite ✨

[Tailwind CSS](https://tailwindcss.com/) nos permitirá crear estilos de manera increíblemente rápida. Seguiremos la guía oficial para integrarlo con Vite.

A continuación, los pasos para la instalación:

1.  **Instala las dependencias** de Tailwind CSS desde la terminal:

```bash
npm install tailwindcss @tailwindcss/vite
```

2.  **Configura el plugin** en el archivo `vite.config.js`. Debes hacer dos cosas:
    * Importar el plugin: `import tailwindcss from '@tailwindcss/vite'`
    * Añadir `tailwindcss()` al *array* de `plugins`.

    Tu archivo `vite.config.js` final debe lucir similar a este:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(),],
})
```

3.  **Importa Tailwind CSS** en tu archivo CSS (por ejemplo, `index.css`) con esta línea:

```css
@import "tailwindcss";
```

4. Para comprobar que tailwindcss esta funcionando, cambiaremos el div que pone App en el archivo `App.jsx` por el siguiente h1, en caso de que veamos los estilos aplicados, sabremos que esta funcionando

```html
<h1 class="text-3xl font-bold underline text-indigo-700"> Hello world! </h1>
```

