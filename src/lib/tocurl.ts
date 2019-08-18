interface Ireq {
  headers: {
    [index: string]: string;
  };
  protocol: string;
  originalUrl: string;
  hostname: string;
  [index: string]: any;
}

function toCurl(req: Ireq): string {
  let curlStr = '';
  const {
    headers = {},
    method,
    protocol,
    hostname: defaultHostName,
    originalUrl,
    body = {}
  } = req;
  const { host: hostname = defaultHostName } = headers;
  const requestUrl = `${protocol}://${hostname}${originalUrl}`;

  // add method
  const methodTemplate = 'curl -X [METHOD] ';
  curlStr += methodTemplate.replace('[METHOD]', method);

  // add url
  const urlTemplate = "'[URL]' ";
  curlStr += urlTemplate.replace('[URL]', requestUrl);

  // add headers
  Object.keys(headers).forEach(key => {
    const headersTemplate = "-H '[KEY]: [VALUE]' ";
    curlStr += headersTemplate
      .replace('[KEY]', key)
      .replace('[VALUE]', headers[key]);
  });

  // add request body
  const reqBodyTemplate = "-d '[BODY]'";
  curlStr += reqBodyTemplate.replace('[BODY]', JSON.stringify(body));

  return `${curlStr}`;
}

export { toCurl };
export default toCurl;
