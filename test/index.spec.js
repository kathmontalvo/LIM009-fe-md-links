import { isPathAbsolute, filePath } from '../src/index.js'

describe('función isPathAbsolute', () => {
  it('deberia retornar true si la ruta es absoluta', () => {
    expect(isPathAbsolute('C:\\WINDOWS\\System32\\Wbem')).toBe(true)
  }),

    it('deberia retornar false si la ruta no es absoluta', () => {
      expect(isPathAbsolute('src/index.js')).toBe(false)
    })
});

describe('funcion filePath', () => {
  it('deberia retornar un array con las rutas abs .md', () => {
    expect(filePath('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files')).toEqual([
      'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\nivel2\\new\\file.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\nivel2\\prueba.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\nivel2\\readme.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1-archivos\\hola.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1-archivos\\readme.md', 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\readme.md'
    ])
  })
})

