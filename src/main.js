import fs from 'fs';
import path from 'path';
import marked from 'marked';
import fetch from 'node-fetch';

export const isPathAbs = route => path.isAbsolute(route);

// export const getAbsRoute = (route) => {
//   isPathAbs(route) ? route : path.resolve(route);
// };

export const filePath = (newRoute, arrFiles = []) => {
  const route = isPathAbs(newRoute) ? newRoute : path.resolve(newRoute);
  const isFile = fs.statSync(route).isFile();
  if (isFile && path.extname(route) === '.md') { // .Md .MD .mD
    arrFiles.push(route);
  } else if (!isFile) {
    fs.readdirSync(route).forEach((f) => {
      filePath(path.join(route, f), arrFiles);
    });
  }
  return arrFiles;
};


export const fileContent = (route) => {
  const arrContent = [];
  filePath(route).forEach((fileRoute) => {
    arrContent.push({
      content: fs.readFileSync(fileRoute).toString(),
      file: fileRoute,
    });
  });
  return arrContent;
};

export const extractedLinks = (route) => {
  const links = [];
  fileContent(route).forEach((res) => {
    // https://github.com/tcort/markdown-link-extractor/blob/master/index.js
    const render = new marked.Renderer();
    render.link = (url, title, urlText) => {
      links.push({
        href: url,
        text: urlText,
        file: res.file,
      });
    };
    marked(res.content, { renderer: render });
  });
  return links;
};


export const validateLinks = (arrObjs) => {
  const promiseArr = arrObjs.map((element) => {
    const url = element.href;
    return fetch(url).then((res) => {
      element.status = res.status;
      if (res.ok) {
        element.ok = 'ok';
      } else {
        element.ok = 'fail';
      }
      return element;
    }).catch((e) => {
      element.ok = 'fail';
      element.status = e.message;
      return element;
    }); // test url no server
  });
  return Promise.all(promiseArr);
};

export const linkStats = (arrObj) => {
  const allUrl = arrObj.map(el => el.href);
  const url = new Set(allUrl);
  const failUrl = arrObj.filter(el => el.ok === 'fail');

  return {
    total: arrObj.length,
    unique: url.size,
    broken: failUrl.length,
  };
};
