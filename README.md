
Enlace a la web: <br/>
Enlace al repositorio: 

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

---

### Componente Navbar

Para crear un componente, deberemos de hacerlo en la carpeta **components** que tenemos que crear dentro de la carpeta **src**, los componentes deben empezar siempre por mayusculas, en nuestro caso sera: Navbar.jsx.

Para hacer el componente más sencillo, crearemos una carpeta llamada **constants** que ira en el directorio raiz, donde pondremos las constantes que vamos a utilizar para nuestros componentes, como en este caso cada enlace de la navbar. Es importante exportar las constantes para poder usarlas en los otros archivos

```javascript
export const navLinks = [
    { label: "Store" },
    { label: "Mac" },
    { label: "iPhone" },
    { label: "Watch" },
    { label: "Vision" },
    { label: "AirPods" },
];
```

En caso de que tuvieramos multiples constantes, podriamos exportarlas todas a la vez al final, en vez de poner export en todas y cada una de ellas. 

Una vez tenemos las constantes, ya podemos usarlas junto a la función .map() para crear listas de maneras dinamicas, esto lo podemos hacer la siguiente manera:

```html
<ul>
    {navLinks.map(({ label }) => (
        <li key={label}>
            <a href={label}>{label}</a>
        </li>
    ))}
</ul>
```

Es importante tener en cuenta, que cuando generemos algo de manera dinamica en react, deberemos de añadirle una propiedad key, sin esto, no funcionara.

Para utilizar imagenes tendremos que tenerlas en la carpeta **public** en nuestro directorio raiz, una vez esten ahi podremos importarlas desde cualquier pagina o componente para utilizar, es importante que la ruta empezara desde la carpeta que tiene las imagenes, no desde la carpeta plubic.

Una vez tenemos el componente hecho, el cual seria el siguiente:

```html
<header>
    <nav>
        <a href="/#">
            <img src="/logo.svg" alt="Apple logo" />
        </a>

        <ul>
            {navLinks.map(({ label }) => (
                <li key={label}>
                    <a href={label}>{label}</a>
                </li>
            ))}
        </ul>
        
        <div className='flex-center gap-3'>
            <button>
                <img src="/search.svg" alt="Search" />
            </button>

            <button>
                <img src="/cart.svg" alt="Cart" />
            </button>
        </div>
    </nav>
</header>
```

Es importante mantener una estructura de pagina correcta, por lo que aunque este sea el componente de la navbar, como es lo unico que estara dentro del header, deberemos ponerlo, ya que sino, nuestra estructura final no tendra header y puede causarnos problemas de SEO, ademas de ser negativo en otros aspectos.

---

## Hero layout

Lo primero que haremos sera creare su archivo correspondiente en la carpeta de componentes y añadirlo al App.jsx, de esta manera todo lo que hagamos podremos verlo facilmente en la pagina principal, empezaremos creando la estructura principal que es la siguiente:

```html
<section id='hero'>
    <div>
        <h1>MacBook Pro</h1>
        <img src="/title.png" alt="MacBook Title" />
    </div>
    
    <video src="/videos/hero.mp4" autoPlay muted playsInline />
</section>
```

Es importante que cuando vayamos a usar un video en React le añadamos un ref, esto es debido a que si usamos un useRef() junto al video, podremos modificarlos de muchas más maneras que si no, para hacer esto es tan sencillo como crear una constante que sera la referencia del video y se la pondremos al video:

```javascript
const videoRef = useRef()
...
<video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />
```

De esta manera, ahora si utilizamos un useEffect(), podremos cambiarle cosas al video, como la velocidad en la que se reproduce para que la "animación" quede más rapida y visual, ya que si la animación es muy lenta puede parecer que la pagina funciona mal o perjudicar la experiencia del usuario al tener que "esperar" para ver la animación completa:

```javascript
useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
}, []);
```

Una vez tenemos el video a nuestro gusto, podemos terminar la estructura del componente añadiendole un poquitin de html extra, siendo este nuestro resultado final:

```html
<section id='hero'>
    <div>
        <h1>MacBook Pro</h1>
        <img src="/title.png" alt="MacBook Title" />
    </div>

    <video ref={videoRef} src="/videos/hero.mp4" muted playsInline />

    <button>Buy</button>
    <p>From $1599 or %133/mo for 12 months</p>
</section>
```

