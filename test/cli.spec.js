import { cliOpts } from '../src/cli.js';
import path from 'path'
import mock from 'mock-fs'
import mockConsole from 'jest-mock-console';

beforeAll(() => {
  mock({
    'level-one': {
      'level-two': {
        'index.html': '',
        'README.md': `
          ## Consideraciones generales
          - Este proyecto se debe "resolver" de manera individual.
          - La librería debe estar implementada en JavaScript para ser ejecutada con Node.js. **Está permitido usar librerías externas**.
          Te recomendamos utilizar [Jest](https://jestjs.io/) para tus pruebas unitarias.
          Podemos instalar directamente desde GitHub. Ver [docs oficiales de npm install acá](https://docs.npmjs.com/cli/install).
          Ahora un archivo roto [fail file](http://archivoroto.fail666.com/fail)
          `,
        'prueba.md':
          `Este archivo no tiene links.`
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
const route = path.join(cwd, 'level-one', 'level-two', 'README.md');

describe('función cliOpts', () => {
  it('deberia retornar file, href y text del archivo en consola', () => {
      const output = 
      `${route} https://jestjs.io/ Jest
      ${route} https://docs.npmjs.com/cli/install docs oficiales de npm install acá
      ${route} http://archivoroto.fail666.com/fail fail file`

      const restoreConsole = mockConsole();
      expect(output).toBe(console.log(cliOpts(route)));
      restoreConsole()
  })
})