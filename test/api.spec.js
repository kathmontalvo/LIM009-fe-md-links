import { mdLinks } from '../src/api.js'
import path from 'path'
import mock from 'mock-fs'
beforeAll(() => {
  mock({
    'level-one': {
      'level-two': {
        'index.html': '',
        'README.md':
`## Consideraciones generales
- Este proyecto se debe "resolver" de manera individual.
- La librería debe estar implementada en JavaScript para ser ejecutada con Node.js. **Está permitido usar librerías externas**.
Te recomendamos utilizar [Jest](https://jestjs.io/) para tus pruebas unitarias.
Podemos instalar directamente desde GitHub. Ver [docs oficiales de npm install acá](https://docs.npmjs.com/cli/install).
Ahora un archivo roto [fail file](https://abc.github.io/assets/)`,
        'prueba.md': `
        Este archivo no tiene links.
        `
      }
    },
    'bootcamp.js': '',
    'markdown.md': 
`[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato Markdown.
- [¿Qué es Node.js y para qué sirve? - drauta.com](https://www.dkkiorauta.com/que-es-nodejs-y-para-que-sirve/fail)`
  })
})

afterAll(mock.restore)

const cwd = process.cwd()
const route = path.join(cwd, 'level-one', 'level-two', 'README.md')

describe('funcion mdLinks', () => {
  it('deberia retornas un arr de obj con el url, texto y ruta absoluta', (done) => {
    mdLinks(route).then(result => {
      const validated = [{
        href: 'https://jestjs.io/',
        text: 'Jest',
        file: route
      }, {
        href: 'https://docs.npmjs.com/cli/install',
        text: 'docs oficiales de npm install acá',
        file: route
      }, {
        href: 'https://abc.github.io/assets/',
        text: 'fail file',
        file: route
      }]

      expect(result).toEqual(validated)
      done()
    })
  })
  it('deberia retornas un arr de obj con el url, texto y ruta absoluta', (done) => {
    mdLinks(route, { validate: false }).then(result => {
      const validated = [{
        href: 'https://jestjs.io/',
        text: 'Jest',
        file: route
      }, {
        href: 'https://docs.npmjs.com/cli/install',
        text: 'docs oficiales de npm install acá',
        file: route
      }, {
        href: 'https://abc.github.io/assets/',
        text: 'fail file',
        file: route
      }]

      expect(result).toEqual(validated)
      done()
    })
  })
  it('deberia retornar un arr de obj con url, texto, ruta, status y ok', (done) => {
    mdLinks(route, { validate: true }).then(result => {
      const validated = [{
        href: 'https://jestjs.io/',
        text: 'Jest',
        file: route,
        status: 200,
        ok: 'ok'
      }, {
        href: 'https://docs.npmjs.com/cli/install',
        text: 'docs oficiales de npm install acá',
        file: route,
        status: 200,
        ok: 'ok'
      }, {
        href: 'https://abc.github.io/assets/',
        text: 'fail file',
        file: route,
        status: 404,
        ok: 'fail'
      }]

      expect(result).toEqual(validated)
      done()
    })
  })
})