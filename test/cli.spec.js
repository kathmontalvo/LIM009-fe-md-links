import { cliOpts } from '../src/cli.js';
import path from 'path'
import process from 'process'
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
        'prueba.md': 
`Este archivo no tiene links.`
      }
    },
    'bootcamp.js': '',
    'markdown.md': 
`[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato Markdown.
- [¿Qué es Node.js y para qué sirve? - drauta.com](https://www.dkkiorauta.com/que-es-nodejs-y-para-que-sirve/fail)
    `
  })
})

afterAll(mock.restore)

const cwd = process.cwd()
const route = path.join(cwd, 'level-one', 'level-two', 'README.md');

describe('función cliOpts', () => {
  it('deberia retornar file, href y text del archivo en consola', (done) => {
    cliOpts(route).then(result => {
      const output =
`${route} https://jestjs.io/ Jest
${route} https://docs.npmjs.com/cli/install docs oficiales de npm install acá
${route} https://abc.github.io/assets/ fail file`
      expect(result).toBe(output);
      done()
    })
  })
  it('validate: deberia retornar file, href, status,ok y text del archivo en consola', (done) => {
    cliOpts(route, [route, '--validate']).then(result => {
      const output =
`${route} https://jestjs.io/ 200 ok Jest
${route} https://docs.npmjs.com/cli/install 200 ok docs oficiales de npm install acá
${route} https://abc.github.io/assets/ 404 fail fail file`
      expect(result).toBe(output);
      done()
    })
  })
  it('stats: deberia retornar el total de links, broken y unique', (done) => {
    cliOpts(route, [route, '--stats', '--validate']).then(result => {
      const output =
`Total: 3
Unique: 3
Broken: 1`
      expect(result).toBe(output);
      done()
    })
  })
  it('stats: deberia retornar el total de links, broken y unique', (done) => {
    cliOpts(route, [route, '--stats']).then(result => {
      const output =
`Total: 3
Unique: 3`
      expect(result).toBe(output);
      done()
    })
  })
})
