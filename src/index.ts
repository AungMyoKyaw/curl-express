import { toCurl } from './lib/tocurl';

function curlExpressMiddleware(req: any, res: any, next: any): void {
  try {
    req.curlcmd = toCurl(req);
  } catch (err) {
    req.curlcmd = `There was error on converting to curl format \nError => ${err.stack}\nMake new issue => https://github.com/AungMyoKyaw/curl-express/issues`;
  }
  next();
}

export default curlExpressMiddleware;

module.exports = curlExpressMiddleware;
module.exports.default = curlExpressMiddleware;
