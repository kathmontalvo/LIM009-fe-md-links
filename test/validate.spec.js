import process from 'process';
import path from 'path';
import mock from 'mock-fs';
import cliOpts from '../src/options';
import { validateLinks, linkStats } from '../src/main';
import mdLinks from '../src/api';
import fetchMock from '../__mocks__/node-fetch';

fetchMock
  .mock('https://jestjs.io/', 200)
  .mock('https://docs.npmjs.com/cli/install', 200)
  .mock('https://abc.github.io/assets404/', 400)
  .mock('https://not-a-route', { throws: new TypeError('Failed to fetch') });

fetchMock.config.sendAsJson = false;

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
Ahora un archivo roto [fail file](https://abc.github.io/assets404/)`,
        'prueba.md': `
        Este archivo no tiene links.
        `,
      },
    },
    'bootcamp.js': '',
    'markdown.md':
      `[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato Markdown.
- [¿Qué es Node.js y para qué sirve? - drauta.com](https://www.dkkiorauta.com/que-es-nodejs-y-para-que-sirve/fail)`,
  });
});

afterAll(mock.restore);

const cwd = process.cwd();
const route = path.join(cwd, 'level-one', 'level-two', 'README.md');

const inputLinks = [{
  href: 'https://jestjs.io/',
  text: 'Jest',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
}, {
  href: 'https://docs.npmjs.com/cli/install',
  text: 'docs oficiales de npm install acá',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
}, {
  href: 'https://abc.github.io/assets404/',
  text: 'fail file',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
}];

const inputLinks2 = [{
  href: 'https://jestjs.io/',
  text: 'Jest',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
}, {
  href: 'https://docs.npmjs.com/cli/install',
  text: 'docs oficiales de npm install acá',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
}, {
  href: 'https://not-a-route',
  text: 'fail file',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
}];
const validated = [{
  href: 'https://jestjs.io/',
  text: 'Jest',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
  status: 200,
  ok: 'ok',
}, {
  href: 'https://docs.npmjs.com/cli/install',
  text: 'docs oficiales de npm install acá',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
  status: 200,
  ok: 'ok',
}, {
  href: 'https://abc.github.io/assets404/',
  text: 'fail file',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
  status: 400,
  ok: 'fail',
}];

const validated2 = [{
  href: 'https://jestjs.io/',
  text: 'Jest',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
  status: 200,
  ok: 'ok',
}, {
  href: 'https://docs.npmjs.com/cli/install',
  text: 'docs oficiales de npm install acá',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
  status: 200,
  ok: 'ok',
}, {
  href: 'https://not-a-route',
  text: 'fail file',
  file: path.join(cwd, 'level-one', 'level-two', 'README.md'),
  status: 'Failed to fetch',
  ok: 'fail',
}];
const output1 = `${route} https://jestjs.io/ Jest
${route} https://docs.npmjs.com/cli/install docs oficiales de npm install acá
${route} https://abc.github.io/assets404/ fail file`;

const output2 = `${route} https://jestjs.io/ 200 ok Jest
${route} https://docs.npmjs.com/cli/install 200 ok docs oficiales de npm install acá
${route} https://abc.github.io/assets404/ 400 fail fail file`;

const output3 = `Total: 3
Unique: 3
Broken: 1`;

const output4 = `Total: 3
Unique: 3`;

const validated3 = [{
  href: 'https://jestjs.io/',
  text: 'Jest',
  file: route,
  status: 200,
  ok: 'ok',
}, {
  href: 'https://docs.npmjs.com/cli/install',
  text: 'docs oficiales de npm install acá',
  file: route,
  status: 200,
  ok: 'ok',
}, {
  href: 'https://abc.github.io/assets404/',
  text: 'fail file',
  file: route,
  status: 400,
  ok: 'fail',
}];

describe('función validateLinks', () => {
  it('deberia retornar un array de obj que contengan las prop status y ok', (done) => {
    validateLinks(inputLinks).then((result) => {
      expect(result).toEqual(validated);
      done();
    });
  });
  it('deberia retornar un array de obj que contengan las prop status y ok', (done) => {
    validateLinks(inputLinks2).then((result) => {
      expect(result).toEqual(validated2);
      done();
    });
  });
});

describe('función linkStats', () => {
  it('deberia retornar un obj con total, unique y broken url', (done) => {
    mdLinks(path.join(cwd, 'level-one', 'level-two', 'README.md'), { validate: true }).then((result) => {
      const totalUrl = {
        total: 3,
        unique: 3,
        broken: 1,
      };
      expect(linkStats(result)).toEqual(totalUrl);
      done();
    });
  });
});

describe('función cliOpts validate', () => {
  it('deberia retornar file, href y text del archivo en consola', (done) => {
    cliOpts(route).then((result) => {
      expect(result).toBe(output1);
      done();
    });
  });

  it('validate: deberia retornar file, href, status,ok y text del archivo en consola', (done) => {
    cliOpts(route, [route, '--validate']).then((result) => {
      expect(result).toBe(output2);
      done();
    });
  });
  it('stats: deberia retornar el total de links, broken y unique', (done) => {
    cliOpts(route, [route, '--stats', '--validate']).then((result) => {
      expect(result).toBe(output3);
      done();
    });
  });
  it('stats: deberia retornar el total de links, broken y unique', (done) => {
    cliOpts(route, [route, '-s', '-v']).then((result) => {
      expect(result).toBe(output3);
      done();
    });
  });
  it('stats: deberia retornar el total de links, broken y unique', (done) => {
    cliOpts(route, [route, '--stats']).then((result) => {
      expect(result).toBe(output4);
      done();
    });
  });
});

describe('funcion mdLinks', () => {
  it('deberia retornar un arr de obj con url, texto, ruta, status y ok', (done) => {
    mdLinks(route, { validate: true }).then((result) => {
      expect(result).toEqual(validated3);
      done();
    });
  });
});
