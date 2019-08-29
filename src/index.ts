import { toCurl, Ioption } from './lib/tocurl';

function curlExpressMiddleware(options: Ioption = { omittedKeys: [] }): any {
  return function middleware(req: any, res: any, next: any): void {
    try {
      req.curlcmd = toCurl(req, options);
    } catch (err) {
      req.curlcmd = `There was error on converting to curl format \nError => ${err.stack}\nMake new issue => https://github.com/AungMyoKyaw/curl-express/issues`;
    }
    next();
  };
}

export default curlExpressMiddleware;

module.exports = curlExpressMiddleware;
module.exports.default = curlExpressMiddleware;
