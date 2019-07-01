import { validateLinks, extractedLinks } from './main';

export default (route, options) => new Promise((resolve, reject) => {
  if (options && options.validate === true) {
    validateLinks(extractedLinks(route)).then((arrResults) => {
      resolve(arrResults);
    });
  } else {
    resolve(extractedLinks(route));
  }
  // reject(console.error);
});
