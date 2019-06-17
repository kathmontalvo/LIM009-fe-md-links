import { mdLinks } from '../src/api.js'

describe('funcion mdLinks', () => {
  it('deberia retornas un arr de obj con el url, texto y ruta absoluta', (done) => {
    mdLinks('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md').then(result => {
      const objLinks = [{
        href: 'https://jestjs.io/',
        text: 'Jest',
        file: 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'
      }, {
        href: 'https://docs.npmjs.com/cli/install',
        text: 'docs oficiales de <code>npm install</code> acá',
        file: 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'
      }]

      expect(result).toEqual(objLinks)
      done()
    })
  })
  it('deberia retornas un arr de obj con el url, texto y ruta absoluta', (done) => {
    mdLinks('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md', { validate: false }).then(result => {
      const objLinks = [{
        href: 'https://jestjs.io/',
        text: 'Jest',
        file: 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'
      }, {
        href: 'https://docs.npmjs.com/cli/install',
        text: 'docs oficiales de <code>npm install</code> acá',
        file: 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'
      }]

      expect(result).toEqual(objLinks)
      done()
    })
  })
  it('deberia retornar un arr de obj con url, texto, ruta, status y ok', (done) => {
    mdLinks('C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md', { validate: true }).then(result => {
      const objLinks = [{
        href: 'https://jestjs.io/',
        text: 'Jest',
        file: 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md',
        status: 200,
        ok: 'ok'
      }, {
        href: 'https://docs.npmjs.com/cli/install',
        text: 'docs oficiales de <code>npm install</code> acá',
        file: 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md',
        status: 200,
        ok: 'ok'
      }]

      expect(result).toEqual(objLinks)
      done()
    })
  })
})