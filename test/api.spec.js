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
})