import { isPathAbsolute, convertToAbs, pathIsFile, checkExt } from '../src/index.js'

describe('función isPathAbsolute', () => {
  it('deberia retornar true si la ruta es absoluta', () => {
    expect(isPathAbsolute('C:\\WINDOWS\\System32\\Wbem')).toBe(true)
  }),

  it('deberia retornar false si la ruta no es absoluta', () => {
    expect(isPathAbsolute('src/index.js')).toBe(false)
  })
});

describe('función convertToAbs', ()=> {
  it('deberia retornar ruta abs', ()=> {
    expect(convertToAbs('./prueba/hijo/grandson.md')).toBe('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\LIM009-fe-md-links\\prueba\\hijo\\grandson.md')
  }),
  it('deberia retornar ruta abs', ()=> {
    expect(convertToAbs('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\LIM009-fe-md-links\\prueba\\hijo\\grandson.md')).toBe('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\LIM009-fe-md-links\\prueba\\hijo\\grandson.md')
  })
});

describe('funcion pathIsFile', () => {
  it('deberia retornar que sí es un archivo', () => {
    expect(pathIsFile('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\data-lovers\\lol.js')).toBe(true)
  }),
  it('deberia retornar que no es un archivo', () => {
    expect(pathIsFile('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria')).toBe(false)
  })
});

describe('función checkExt', () => {
  it.only('debería retornar la extensión .md', () => {
    expect(checkExt('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\LIM009-Social-Network\\README.md')).toBe('.md')
  })
})