import {validateLinks, extractedLinks} from './main.js'

export const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate == true) {
      validateLinks(route).then((arrResults) => {
        resolve(arrResults)
      })
    } else if (!options || options.validate == false) {
      resolve(extractedLinks(route))
    }
  })
}

const route = 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files'
const file = 'C:\\Users\\Kathlen\\Google Drive\\Programación\\Laboratoria\\bootcamp\\Pruebas\\md-files\\nivel1\\markdown.md'

mdLinks(file, { validate: true })
  .then(result => console.log(result))