
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

### Registro de Plugins de GSAP 
Vamos a utilizar dos plugins esenciales de GSAP: **ScrollTrigger** y **SplitText**. Para que estos plugins funcionen correctamente, debemos registrarlos. 

Sigue estos dos pasos para la importación y el registro: 
1. **Importa los plugins** que necesitas usando esta línea de código: 
```javascript 
import { ScrollTrigger, SplitText } from 'gsap/all' 
```
 
2. **Registra los plugins** usando la función `gsap.registerPlugin()`: 
```javascript 
gsap.registerPlugin(ScrollTrigger, SplitText)
``` 

> **Consejo Clave:** Para mantener tu código **limpio y organizado**, lo mejor es registrar estos plugins en el archivo **`App.jsx`**. Si no los registras allí, tendrás que importarlos y registrarlos en *cada* componente donde vayas a utilizarlos. ¡Así te ahorras trabajo! 

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

---

## Componente ProductViewer 

Lo primero que haremos sera creare su archivo correspondiente en la carpeta de componentes y añadirlo al App.jsx, de esta manera todo lo que hagamos podremos verlo facilmente en la pagina principal, empezaremos creando la estructura principal que es la siguiente:

```html
<section id='product-viewer'>
    <h2>Take a closer look.</h2>

    <div className='controls'>
        <p className='info'>MacbookPro 16" in Space Black</p>
        
        <div className='flex-center gap-5 mt-5'>
            <div className='color-control'>
                <div className='bg-neutral-300' />
                <div className='bg-neutral-900' />
            </div>

            <div className='size-control'>
                <div><p>14"</p></div>
                <div><p>16"</p></div>
            </div>
        </div>
    </div>
    
    <p className='text-white text-4xl'>Render Canvas</p>
</section>
```

En este caso, como queremos renderizar un canvas, el cual sera el propio Macbook Pro, deberemos de instalar las cosas necesarias, aunque se pueden hacer de diferentes maneras, en este caso lo haremos con [ZUSTAND](https://zustand-demo.pmnd.rs/), para instalarlo solo tendremos que usar el siguiente comando:

```
npm install zustand clsx
```

Una vez tenemos instalado zustand y clsx, deberemos de crear una carpeta en el directorio src, la cual se llamara store y tendra un archivo llamado index.js, en dicho archivo deberemos de añadir lo siguiente:

```javascript
import { create } from 'zustand';

const useMacbookStore = create((set) => ({
    color: '#2e2c2e',
    setColor: (color) => set({ color }),

    scale: 0.08,
    setScale: (scale) => set({ scale }),

    reset: () => set({ color: '#2e2c2e', scale: 0.08 })
}));

export default useMacbookStore;
```

Esto sirve para darle las propiedades que queremos al MacbookPro, de esta manera, podremos cambiarle los colores y tamaño mediante los set de manera sencilla y rapida. Basicamente lo que estamos haciendo es crear un customHook para el modelo 3D.

Con esto hecho, volveremos al componente de ProductViewer y añadiremos el hook que hemos creado, obteniendo todas las propiedas, color, escala y los setters:

```javascript
const { color, scale, setColor, setScale } = useMacbookStore();
```

Con dicha constante creada, ahora deberemos de modificar los divs, los cuales estamos usando como "botones" para controlar los colores y tamaños y añadirle una funciona onClick, la cual sera el setColor o setScale, de esta manera, al pulsar el div cambiaremos el valor de dicha variable al que queremos, ademas de ello, utilizaremos clsx en los classname, para poder añadirle condiciones ternarias para comprobar si estan "seleccionados" y añadirle la clase de activo, aqui hay un ejemplo simple:

```javascript
<div
    onClick={() => setColor('#adb5bd')}
    className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')}
/>
```

De esta manera, al pulsar el div, cambiaremos el color al correspondiente y el clsx al comprobar los colores, una vez lo hemos cambiado a ese, la condición sera verdadera y añadira la clase de 'active'.

Gracias a esto, podremos cambiar multiples cosas del div principal, para que se hagan de manera dinamica y fluida, por lo que el div principal del componente ahora mismo seria el siguiente:

```javascript
<div className='controls'>
    <p className='info'>MacbookPro {scale} in {color}</p>

    <div className='flex-center gap-5 mt-5'>
        <div className='color-control'>
            <div
                onClick={() => setColor('#adb5bd')}
                className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')}
            />
            <div
                onClick={() => setColor('#2e2c2e')}
                className={clsx('bg-neutral-900', color === '#2e2c2e' && 'active')}
            />
        </div>

        <div className='size-control'>
            <div
                onClick={() => setScale(0.06)}
                className={clsx(scale === 0.06 ? 'bg-white text-black' 'bg-transparent text-white')}
            >
                <p>14"</p>
            </div>
            <div
                onClick={() => setScale(0.08)}
                className={clsx(scale === 0.08 ? 'bg-white text-black' 'bg-transparent text-white')}
            >
                <p>16"</p>
            </div>
        </div> 
    </div>
</div>
```

Para comprobar que todo funciona correctamente, si pulsamos un controlador, ya sea el de los colores o el de los tamaños, veremos cambiar el texto, aunque obviamente ese no sera el texto que vamos a dejar, ya que es poco legible, sobretodo el color, ya que esta en hexadecimal en vez de en texto.

Una vez tenemos esto, vamos a renderizar el modelo 3D, para ello vamos a utilizar la libreria de [three.js](https://threejs.org/), en este caso, al estar utilizando react, ademas de instalar three.js, instalaremos dos librerias adiccionales para ayudarnos a utilizar three.js, para ello tendremos que usar el siguiente comando:

```shell
npm install three @react-three/drei @react-three/fiber
```

Una vez tenemos instalado todas estas librerias, volveremos a nuestro componente, ProductViewer y en la etiqueta p que teniamos, la cambiaremos por un Canvas, el cual tiene que ser importado de @react-three/fiber y ademas, importaremos una caja (Box) de @react-three/drei, para comprobar que funciona, por lo que ahora, nuestro componente deberia tener una caja blanca (en 3d) y los siguientes imports:

```javascript
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

...

<Canvas id='canvas'>
    <Box position={[-1 ,1, 0]}></Box>
</Canvas>
```

Es importante que nuestro Canvas tenga una id, ya que luego le iremos cambiando propiedades a dicho modelo, la propiedad position sirve para mover el modelo, hay que tener en cuenta, que al ser un modelo 3D, tiene 3 ejes, X, Y, Z, los cuales son, horizontal, vertical y profundidad, aunque no hayas tocado modelos 3Ds, puede que estes familiarizado gracias a propiedades de css como z-index.

Para comprobar que nuestros botones funcionan, añadiremos las propiedades correspondientes a la caja y veremos como cambian en función del boton que pulsemos, para cambiar el tamaño usaremos scale y para cambiar el color usaremos material-color y como valor pondremos las variables de nuestro customHook:

```javascript
<Canvas id='canvas'>
    <Box position={[-1, 1, 0]} scale={10 * scale} material-color={color}></Box>
</Canvas>
```

Una vez tenemos hecho que cuando pulsemos los botones cambie de color y tamaño nos encargaremos de hacer la camara, para ello deberemos de añadir la propiedad camera y ajustarla como nos guste, pero por mucho que lo cambiemos, no podremos mover el modelo, para pdoer mover el modelo deberemos de añadir dentro del Canvas la etiqueta "OrbitControls" y como no queremos que puedan hacer zoom le añadiremos la propiedad de "enableZoom={false}".

```javascript
<Canvas id='canvas' camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>
    <Box position={[0, 0, 0]} scale={10 * scale} material-color={color}></Box>

    <OrbitControls enableZoom={false} />
</Canvas>
```

## Renderizado de modelo

Aunque tengamos el modelo 3D que necesitamos o queremos, no podremos usarlo si no lo convertimos en un componente de React, para ello utilizaremos GLTFJSX, con el siguiente comando, el cual basicamente convierte el modelo en un componente de React utilizando gltfjsx, utilizamos el -T para darle una estructura más sencilla y limpia:

(Es importante que pongas la ruta correctamente, en este caso mi ruta era .\ ya que estoy en windows y en la carpeta donde se encuentra los modelos, la cual tengo dentro de public y models, por lo que si estas en la carpeta del proyecto tendras que usar una ruta similar a ./public/models/macbook-14.glb)

```shell
npx gltfjsx .\macbook-14.glb -T
```

Una vez hemos hecho esto veremos que en la propia carpeta se nos ha creado un archivo, él cual es el modelo 3D pero en formato .jsx, para tener una mejor estructura crearemos una carpeta models dentro de la carpeta components en la cual añadiremos dichos archivos.

En el archivo de modelo .jsx, deberemos de cambiar algunas cosas, como el nombre, ya que no lo llamaremos Model, sino su nombre correspondiente que en este caso es: MacbookModel14, cambiaremos a que el export sea un export default y ademas deberemos de cambiar la ruta, en nuestro caso solo tendremos que añadirle /models/ ya que los modelos estan dentro de la carpeta /public/models/

Para poder añadirle una textura utilizaremos una constante el cual sera un hook, especificamente useTexture(), una vez hecho esto deberemos de añadirle en el mesh node 123, la siguiente etiqueta:

```javascript
<meshBasicMaterial map={texture} />
```

De esta manera cambiaremos la textura, una vez hecho esto, deberemos de hacer lo mismo pero con los demas modelos, ya que no vamos a utilizar solamente 1, es importante que hagamos este proceso en los 3 modelos, macbook14, macbook16 y macbook.

En este caso, con los modelos ya hechos, podremos cambiar nuestra caja, por el modelo, en este  caso el que estara renderizado sera el MacbookModel14, por lo quenuestro canvas deberia verse de la siguiente manera:

```javascript
<Canvas id='canvas' camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>

    <MacbookModel14 scale={0.06} position={[-1, 0, 0]} />
    <OrbitControls enableZoom={false} />

</Canvas>
```

Es importante recordar importar el modelo, una vez hecho esto, no se vera practicamente nada, solamente la textura de la pantalla que le hemos dado antes, para hacer que sea visible deberemos de añadirle una luz ambiental, ya que el modelo esta completamente a oscuras, para hacer eso deberemos de utilizar otra etiqueta, la cual es ambientLight y añadirle la propiedad de intensity, dandonos el siguiente resultado:

```javascript
<Canvas id='canvas' camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>

    <ambientLight intesity={1} />
    <MacbookModel14 scale={0.06} position={[0, 0, 0]} />
    <OrbitControls enableZoom={false} />

</Canvas>
```

Es importante no confundir ambientLight con AmbientLight de Three, ya que son cosas diferente y probablemente no funcione, una vez tenemos ese Canvas, si pulsamos los botones no pasara nada, ya que le hemos puestos valores fijos, por lo que no te preocupes si ves que han dejado de funcionar. Nuestro siguiente paso es modificar la luz para que se vea correctamente, lo cual es un poco más dificil de lo que puede parecera primera vista, ya que no solo sirvecon el ambientLight intesity={1}


## Componente StudioLights

Lo primero que haremos sera crear una carpeta llamada three dentro de components, ya que este sera un componente para three.js, ahora crearemos el archivo StudioLights.jsx dentro de dicha carpeta, que sera este sera el componente que utilizaremos en vez del ambientLights.

Es importante saber que cuando hagamos el cambio la pagina se rompera, ya que el modelo 3D no funcionara al tener el componente dentro del canvas sin formar parte de él, para solucionar este problema deberemos de cambiar la etiqueta principal del componente a group, de esta manera funcionara.

```javascript
const StudioLights = () => {
    return (
        <group name='lights'></group>
    );
};
```

Esto lo estamos haciendo para poder crear entorno, el cual lo haremos con Environment el cual importamos de @react-three/drei, le pondremos la propiedad de resolution={256}, él cual es una resolución equilibrado tanto en resolución como en rendimiento.

Dentro del Environment crearemos otro group para poder meter varias cosas, las cuales seran Lightformer, importadas tambien de @react-three/drei, pondremos dos, ya que una vendra de la derecha y otra de la izquierda, para que este completamente iluminado

```javascript
<group>
    <Lightformer
        form="rect"
        intensity={10}
        position={[-10, 5, -5]}
        scale={10}
        rotation-y={Math.PI / 2}
    />

    <Lightformer
        form="rect"
        intensity={10}
        position={[10, 0, 1]}
        scale={10}
        rotation-y={Math.PI / 2}
    />
</group>
```

Una vez tenemos las luces principales, podemos crear spotligths, que son basicamentes, destellos o luces de resalto, las cuales sirven para resaltar ciertas partes, esto lo haremos con la etiqueta spotLight:

```javascript
<spotLight
    position={[-2, 10, 5]}
    angle={0.15}
    decay={0}
    intensity={Math.PI * 0.2}
/>
```

Ahora simplemente añadiremos unos cuantos destellos más para que quede mejor, dando el siguiente componente final:

```javascript
<group name='lights'>

    <Environment resolution={256}>
        <group>
            <Lightformer
                form="rect"
                intensity={10}
                position={[-10, 5, -5]}
                scale={10}
                rotation-y={Math.PI / 2}
            />

            <Lightformer
                form="rect"
                intensity={10}
                position={[10, 0, 1]}
                scale={10}
                rotation-y={Math.PI / 2}
            />
        </group>
    </Environment>

    <spotLight
        position={[-2, 10, 5]}
        angle={0.15}
        decay={0}
        intensity={Math.PI * 0.2}
    />

    <spotLight
        position={[0, -25, 10]}
        angle={0.15}
        decay={0}
        intensity={Math.PI * 0.2}
    />

    <spotLight
        position={[0, 15, 5]}
        angle={0.15}
        decay={0}
        intensity={Math.PI * 1}
    />
</group>
```

---

## Componente ModelSwitcher

Esta vez, en vez de crear el componente en la carpeta de components, deberemos de hacerlo en la carpeta three que hemos creado para el componente anterior, ya que va a ser un componente de three.js, Una vez dentro de esa carpeta, crearemos el componente ModelSwitcher.jsx, el cual nos servira para animar con GSAP los cambios de modelo, ademas añadiremos los PresentationControls, que haran lo que ahora mismo hace OrbitControls, pero de una manera más customizable.

Importaremos el componente ModelSwitcher, ademas de crear la constante de isMobile con el useMediaQuery, esto nos servira para crear una condición ternaria la cual dependiendo de nuestra resolución cambiar el tamaño del modelo, ya que si es mobil lo haremos algo más pequeño para que quepa en pantalla:

```javascript
<ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
```

Una vez tenemos este añadimiento, vamos a crear el componente, es importante tener en cuenta, que le estamos pasando propiedades, por lo que a diferencia de los anteriores, deberemos de añadirle dichas propiedades a la hora de crear el componente, ademas, crearemos una referencia para saber cual es el que modelo que vamos a mostrar. Ademas de crear una constante para el tamaño, es importante añadirle un or, ya que en caso de que sea resolución de movil, el tamaño debera ser más pequeño:

```javascript
const SCALE_LARGE_DESKTOP = 0.08;
const SCALE_LARGE_MOBILE = 0.05;

const smallMacbookRef = useRef();
const largeMacbookRef = useRef();

const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;
```

En vez de tener la etiqueta del componente como section o un div, dejaremos la etiqueta vacia, creando así un reactFragment, el cual contendra el PresntationControls, él cual debemos de importar de @react-thre/drei, dentro de dicha etiqueta tendremos un group, el cual tendra un ref para saber que modelo es y el modelo correspondiente, esto lo duplicaremos, para tener uno por cada modelo, quedando el siguiente resultado:

```javascript
<PresentationControls>
    <group ref={largeMacbookRef}>
        <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
    </group>
</PresentationControls>

<PresentationControls>
    <group ref={smallMacbookRef}>
        <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
    </group>
</PresentationControls>
```

Una vez tenemos esto, veremos 3 modelos en la pagina, esto es debido a que aún no habiamos borrado el MacbookModel14 que teniamos, por lo que al borrarlo veremos que solo quedan 2, de los cuales, comentaremos uno, aunque le iremos haciendo los cambios a la vez, esto nos servira para poder ver facilmente lo que estamos haciendo.

Les pasaremos una copia del objeto gracia a los ... y añadiremos la constante controlsConfig, la cual crearemos con la propiedad de `snap: true`, esto sera para cuando movamos el Macbook, se reposicione automaticamente a su posición de origen.

```javascript
<PresentationControls {... controlsConfig}>
    <group ref={largeMacbookRef}>
        <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
    </group>
</PresentationControls>

{/* <PresentationControls {...controlsConfig}>
    <group ref={smallMacbookRef}>
        <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
    </group>
</PresentationControls> */}
```

Una vez hemos comprobado que funciona, añadiremos más configuraciones a dicha constante, de esta manera personalizaremos a nuestro gusto los controles de la camara, de la siguiente manera: </br>
snap: Vuelve a la posición de origen. </br>
speed: Cambia la velocidad de lo que mueves. </br>
zoom: Es el zoom de la camara </br>
polar: [-Math.PI, Math.PI]: Hace que puedas moverlo en el eje Y todo lo que quieras. </br>
azimuth: [-Infinity, Infinity]: Hace que puedas moverlo en el eje X todo lo que quieras. </br>
config: { mass: 1, tension: 0, friction: 26 }: Imita las fisicas reales </br>

De esta manera, nuestro objeto de configuración sera esto:

```javascript
const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    polar: [-Math.PI, Math.PI],
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 }
};
```
Ahora vamos a crear algunas constantes que utilizaremos para las animaciones y modelos, como la duración y la distancia a la que vamos a mover los modelos cuando los cambiemos, ya que van a aparecer que se van y vuelven, para esto utilizaremos una función, que en caso de tener un grupo, miraremos cada elemento dentro del grupo y le aplicaremos los estilos y animaciones

```javascript
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
    if (!group) return;

    group.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
        }
    });
};
```

De esta manera, aplicaremos la animación del gsap.to() a todos los hijos del elemento group, que hara transparante tanto el material como el propio elemento, haciendo ver que "desaparece", ademas de esto, para darle una mejor experiencia al usuario, haremos que se muevan para un lado antes de desaparecer por completo, dando una sensación más natural

```javascript
const moveGroup = (group, x) => {
    if (!group) return;

    gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};
```

Una vez tenemos estas funciones creadas, para poder utilizar de manera correcta deberemos de utilizar el hook de useGSAP(), el cual deberemos hacer que se renderice cada vez que le cambiemos el tamaño al modelo, ya que queremos que la animación aparezca cuando cambiemos el tamaño:

```javascript
useGSAP(() => { }, [scale]);
```

Una vez tenemos el useGSAP() que se actualiza cuando queremos, deberemos de añadirle las funciones que hemos creado anteriormente, para ocultar o mostrar y hacer que se muevan los modelos

```javascript
useGSAP(() => {
    
    if (showLargeMacbook) {
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
        moveGroup(largeMacbookRef.current, 0);

        fadeMeshes(smallMacbookRef.current, 0);
        fadeMeshes(largeMacbookRef.current, 1);
    } else {
        moveGroup(smallMacbookRef.current, 0);
        moveGroup(largeMacbookRef.current, +OFFSET_DISTANCE);

        fadeMeshes(smallMacbookRef.current, 1);
        fadeMeshes(largeMacbookRef.current, 0);
    }

}, [scale]);
```

Es importante que descomentemos el que habiamos comentado anteriormente, ya que si no, no se mostrara el otro modelo una vez se haga la animación y quedara vacio, despues de haber hecho esto solo nos faltaria hacer que podamos cambiar el color, ya que actualmente no funciona. 

Para hacer que funcione tendremos que ir al modelo y añadirle una constante del color, la cual vendra del useMacbookStore(), una vez tenemos esto, tambien deberemos de obtener la escena del useGLTF, una vez tenemos esas dos cosas adicionales, crearemos un useEffect que se renderice cada vez que actualizamos el color, ya que es lo que nos falta:

```javascript
const { color } = useMacbookStore();
const { nodes, materials, scene } = useGLTF('/models/macbook-14-transformed.glb');

...

useEffect(() => { }, [color]);
```

Con eso ya como base deberemos de modificar el useEffect(), para que pille la escena y a cada elemeto hijo de la escena, en caso de que sea un mesh (un mesh es una parte del modelo 3D) y no sea una de las partes que no debemos cambiar, le cambiaremos el color al correspondiente que estamos sacando del useMacbookStore(). De esta manera, aunque en el ProductViewer no se le esta pasando el color, como lo obtenemos directamente el hook, sigue funcionando los botones:


```javascript
useEffect(() => {

    scene.traverse((child) => {
        if (child.isMesh) {
            if (!noChangeParts.includes(child.name)) {
                child.material.color = new Color(color);
            }
        }
    });

}, [color, scene]);
```

Es importante que hagamos estas modificaciones en los dos modelos, ya que si solo lo hacemos en uno, no funcionara en el otro, ya que no lo tiene implementado, para ello, simplemente deberemos copiar y pegar.


