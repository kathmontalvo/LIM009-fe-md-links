import mdLinks from './api';
import { linkStats } from './main';

export default (route, args) => {
  if (args && (args[1] === '--validate' || args[1] === '-v')) {
    return mdLinks(route, { validate: true })
      .then(result => result.map(el => `${el.file} ${el.href} ${el.status} ${el.ok} ${el.text}`).toString().replace(/,/g, '\n'))
      .catch(console.error);
  }
  if (args && (args[1] === '--stats' || args[1] === '-s') && !args[2]) {
    return mdLinks(route, { validate: true })
      .then((result) => {
        const basicStats = linkStats(result);
        return `Total: ${basicStats.total}
Unique: ${basicStats.unique}`;
      })
      .catch(console.error);
  }
  if (args && (args[1] === '--stats' || args[1] === '-s') && (args[2] === '--validate' || args[2] === '-v')) {
    return mdLinks(route, { validate: true })
      .then((result) => {
        const basicStats = linkStats(result);
        return `Total: ${basicStats.total}
Unique: ${basicStats.unique}
Broken: ${basicStats.broken}`;
      })
      .catch(console.error);
  }
  return mdLinks(route)
    .then(result => result.map(el => `${el.file} ${el.href} ${el.text}`).toString().replace(/,/g, '\n'))
    .catch(console.error);
};
