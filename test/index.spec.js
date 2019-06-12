import { convertToAbs, isPathAbs, isFile, getAbsRoute, filePath, fileContent, extractedLinks, validateLinks } from '../src/main.js'

const content = [{
  content:
    '## Consideraciones generales\r\n\r\n- Este proyecto se debe "resolver" de manera individual.\r\n\r\n- La librería debe estar implementada en JavaScript para ser ejecutada con\r\nNode.js. **Está permitido usar librerías externas**.\r\n\r\n- Tu módulo debe ser instalable via `npm install <github-user>/md-links`. Este\r\nmódulo debe incluir tanto un _ejecutable_ que podamos invocar en la línea de\r\ncomando como una interfaz que podamos importar con `require` para usarlo\r\nprogramáticamente.\r\n\r\n- Los tests unitarios deben **cubrir un mínimo del 70% de _statements_, _functions_,\r\n_lines_ y _branches_.**, ademas de pasar los test y el linter. Te recomendamos \r\nutilizar [Jest](https://jestjs.io/) para tus pruebas unitarias.\r\n\r\n- Deberas de crear un script en el `package.json` que transforme el codigo\r\nES6+ a ES5 con ayuda de babel.\r\n\r\n## Criterios de aceptacion\r\n\r\nEstos son los criterios de lo que debe ocurrir para que se satisfagan \r\nlas necesidades del usuario:\r\n\r\n- Instalar la libreria via `npm install --global <github-user>/md-links`\r\n\r\n### `README.md`\r\n\r\n- Encontrar el *pseudo codigo* o *diagrama de flujo* con el algoritmo que\r\n  soluciona el problema.\r\n- Encontrar un board con el backlog para la implementación de la librería.\r\n- Encontrar la documentación técnica de la librería.\r\n- Encontrar la Guía de uso e instalación de la librería.\r\n\r\n### API `mdLinks(path, opts)`\r\n\r\n- El módulo exporta una función con la interfaz (API) esperada.\r\n- El módulo implementa soporte para archivo individual\r\n- El módulo implementa soporte para directorios\r\n- El módulo implementa `options.validate`\r\n\r\nPara que el módulo sea instalable desde GitHub solo tiene que:\r\n\r\n- Estar en un repo público de GitHub\r\n- Contener un `package.json` válido\r\n\r\nCon el comando `npm install githubname/reponame` podemos instalar directamente\r\ndesde GitHub. Ver [docs oficiales de `npm install` acá](https://docs.npmjs.com/cli/install).\r\n',
  file:
    'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'
}]
const objLinks = [{
  href: 'https://jestjs.io/',
  text: 'Jest',
  file:
    'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'
},
{
  href: 'https://docs.npmjs.com/cli/install',
  text: 'docs oficiales de <code>npm install</code> acá',
  file:
    'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'
}]

describe('función isPathAbsolute', () => {
  it('deberia retornar true si la ruta es absoluta', () => {
    expect(isPathAbs('C:\\WINDOWS\\System32\\Wbem')).toBe(true)
  }),

    it('deberia retornar false si la ruta no es absoluta', () => {
      expect(isPathAbs('src/index.js')).toBe(false)
    })
});

describe('función getAbsRoute', () => {
  it('deberia retornar la ruta absoluta de la relativa que es ingresada', () => {
    expect(getAbsRoute('../LIM009-fe-md-links')).toBe('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\LIM009-fe-md-links')
  })
  it('deberia retornar la ruta absoluta de la abs que es ingresada', () => {
    expect(getAbsRoute('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\LIM009-fe-md-links')).toBe('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\LIM009-fe-md-links')
  })
})

describe('funcion filePath', () => {
  it('deberia retornar un array con las rutas abs .md', () => {
    expect(filePath('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files')).toEqual([
      'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\nivel2\\new\\file.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\nivel2\\prueba.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\nivel2\\readme.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1-archivos\\hola.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1-archivos\\readme.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\readme.md'
    ])
  })
})

describe('función fileContent', () => {
  it('deberia retornar el contenido de los archivos md', () => {
    expect(fileContent('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md')).toEqual(content)
  })
})

describe('función extractedLinks', () => {
  it('debería retornar un array de objetos', () => {
    expect(extractedLinks('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md')).toEqual(console.log(extractedLinks('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md')))
  })
})

// describe('función validateLinks', () => {
//   it('deberia retornar un array de obj que contengan las prop status y ok', () => {
//     expect(validateLinks).toBe()
//   })
// })