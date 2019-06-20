# md-links

El módulo `md-links` es una herramienta que lee y analiza archivos de formato Markdown, para verificar los links que contengan y reportar estadísticas sobre ellos.

## Instalación

`npm install -g kathmontalvo/md-links`

## Guía de uso

### API

Primero importamos la función `mdLinks`, la cual es una promesa donde ingresan dos parámetros: `(route, options)` que resuelve un arr de objects que nos indican: [{href, text, file}] de los links en nuestros archivos md.

Con respecto al primer parámetro `route`, este puede ser una ruta relativa o absoluta de un archivo o un directorio.

El parámetro `options` es un objeto cuya propiedad `validate` es un boolean que, de requerirse, valida los links extraídos.

#### Ejemplos:

```js
const mdLinks = require("md-links");

mdLinks("./path/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./path/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./path/to/dir", { validate: false })
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI

El ejecutable de nuestra aplicación debe realizarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Ejemplo:

```sh
$ md-links ./path/example.md
./path/example.md http://something.com/11/23/ Link to something
./path/example.md https://something-else.net/some-doc.html Some doc
./path/example.md http://google.com/ Google
```

El comportamiento por defecto no valida si las URLs responden ok o no,
solo identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que va
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link.

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./path/example.md --validate
./path/example.md http://something.com/11/23/ ok 200 Link to something
./path/example.md https://something-else.net/some-doc.html fail 404 Some doc
./path/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./path/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./path/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```


## Diagrama de flujo 

Para realizar el presente proyecto, se inició con el siguiente diagrama para definir el flujo que iba a ocurrir en el código.

![flow-chart](https://user-images.githubusercontent.com/47748892/59810678-108a6600-92cc-11e9-8135-2701b8b4d6e1.jpg)