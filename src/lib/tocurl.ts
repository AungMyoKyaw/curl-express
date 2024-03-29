interface Ireq {
  headers: {
    [index: string]: string;
  };
  protocol: string;
  originalUrl: string;
  hostname: string;
  [index: string]: any;
}

export interface Ioption {
  omittedKeys: string[];
}

function toCurl(req: Ireq, options: Ioption = { omittedKeys: [] }): string {
  let curlStr = '';
  const {
    headers = {},
    method,
    protocol,
    hostname: defaultHostName,
    originalUrl,
    body = {}
  } = req;
  const { omittedKeys } = options;
  const { host: hostname = defaultHostName } = headers;
  const requestUrl = `${protocol}://${hostname}${originalUrl}`;

  // add method
  const methodTemplate = 'curl -X [METHOD] ';
  curlStr += methodTemplate.replace('[METHOD]', method);

  // add url
  const urlTemplate = "'[URL]' ";
  curlStr += urlTemplate.replace('[URL]', requestUrl);

  // add headers
  Object.keys(headers)
    .filter(key => !omittedKeys.includes(key))
    .forEach(key => {
      const headersTemplate = "-H '[KEY]: [VALUE]' ";
      curlStr += headersTemplate
        .replace('[KEY]', key)
        .replace('[VALUE]', headers[key]);
    });

  // add request body
  const isEmptyBody = Object.keys(body).length < 1;
  switch (isEmptyBody) {
    case true:
      curlStr = curlStr.slice(0, -1);
      break;
    case false: {
      const reqBodyTemplate = "-d '[BODY]'";
      omittedKeys.forEach(key => delete body[key]);
      curlStr += reqBodyTemplate.replace('[BODY]', JSON.stringify(body));
      break;
    }
    default:
  }

  return `${curlStr}`;
}

export { toCurl };
export default toCurl;
