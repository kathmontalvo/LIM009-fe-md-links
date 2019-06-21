import { isPathAbs, getAbsRoute, filePath, fileContent, extractedLinks, validateLinks, linkStats } from '../src/main.js'
import mock from 'mock-fs'
import path from 'path'
import process from 'process'

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
'markdown.md': `
[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato Markdown.
- [¿Qué es Node.js y para qué sirve? - drauta.com](https://www.dkkiorauta.com/que-es-nodejs-y-para-que-sirve/fail)
    `
  })
  
})

afterAll(mock.restore)

const cwd = process.cwd()

describe('función isPathAbsolute', () => {
  it('deberia retornar true si la ruta es absoluta', () => {
    expect(isPathAbs(path.join(cwd, 'level-one'))).toBe(true)
  });
  it('deberia retornar false si la ruta no es absoluta', () => {
    expect(isPathAbs('./level-one/markdown.md')).toBe(false)
  })
});


describe('función getAbsRoute', () => {
  it('deberia retornar la ruta absoluta de la relativa que es ingresada', () => {
    expect(getAbsRoute('level-one/level-two/README.md')).toBe(path.join(cwd, 'level-one', 'level-two', 'README.md'))
  })
  it('deberia retornar la ruta absoluta de la abs que es ingresada', () => {
    expect(getAbsRoute(path.join(cwd, 'level-one'))).toBe(path.join(cwd, 'level-one'))
  })
})


describe('función fileContent', () => {
  it('deberia retornar el contenido de los archivos md', () => {
    const content = [{
      content:
`## Consideraciones generales
- Este proyecto se debe "resolver" de manera individual.
- La librería debe estar implementada en JavaScript para ser ejecutada con Node.js. **Está permitido usar librerías externas**.
Te recomendamos utilizar [Jest](https://jestjs.io/) para tus pruebas unitarias.
Podemos instalar directamente desde GitHub. Ver [docs oficiales de npm install acá](https://docs.npmjs.com/cli/install).
Ahora un archivo roto [fail file](https://abc.github.io/assets/)`,
      file: path.join(cwd, 'level-one', 'level-two', 'README.md')
    }]

    expect(fileContent(path.join(cwd, 'level-one', 'level-two', 'README.md'))).toEqual(content)
  })

})


describe('funcion filePath', () => {
  it('deberia retornar un array con las rutas abs .md', () => {
    expect(filePath(path.join(cwd, 'level-one'))).toEqual([
      path.join(cwd, 'level-one', 'level-two', 'README.md'),
      path.join(cwd, 'level-one', 'level-two', 'prueba.md')
    ])
  })

  it('deberia retornar la ruta que es ingresada', () => {
    expect(filePath(path.join(cwd, 'markdown.md'))).toEqual([path.join(cwd, 'markdown.md')])
  })
})


describe('función extractedLinks', () => {

  it('debería retornar un array de objetos', () => {
    const objLinks = [{
      href: 'https://jestjs.io/',
      text: 'Jest',
      file: path.join(cwd, 'level-one', 'level-two', 'README.md')
    }, {
      href: 'https://docs.npmjs.com/cli/install',
      text: 'docs oficiales de npm install acá',
      file: path.join(cwd, 'level-one', 'level-two', 'README.md')
    }, {
      href: 'https://abc.github.io/assets/',
      text: 'fail file',
      file: path.join(cwd, 'level-one', 'level-two', 'README.md')
    }]

    expect(extractedLinks(path.join(cwd, 'level-one', 'level-two', 'README.md'))).toEqual(objLinks)
  })
})

