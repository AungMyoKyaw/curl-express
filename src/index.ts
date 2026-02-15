import { Request, Response, NextFunction } from 'express';
import { toCurl, CurlOptions } from './lib/tocurl';

/**
 * Augment Express Request interface with curlcmd property.
 */
declare module 'express' {
  interface Request {
    /** The cURL command representation of this request */
    curlcmd?: string;
  }
}

/**
 * Express middleware that converts incoming requests to cURL commands.
 *
 * The cURL command is attached to `req.curlcmd` and can be used for logging,
 * debugging, or reproducing requests.
 *
 * @param options - Configuration options
 * @param options.omittedKeys - Array of header keys to omit from the curl command
 *                              (useful for hiding sensitive headers like authorization)
 * @returns Express middleware function
 *
 * @example
 * ```typescript
 * import express from 'express';
 * import curlExpress from 'curl-express';
 *
 * const app = express();
 *
 * app.use(express.json());
 * app.use(curlExpress({ omittedKeys: ['authorization', 'cookie'] }));
 *
 * app.get('/api', (req, res) => {
 *   console.log(req.curlcmd); // Logs the curl command
 *   res.send('OK');
 * });
 * ```
 */
function curlExpressMiddleware(
  options: CurlOptions = {}
): (req: Request, res: Response, next: NextFunction) => void {
  return function middleware(req: Request, _res: Response, next: NextFunction): void {
    try {
      req.curlcmd = toCurl(req, options);
    } catch (error) {
      // Sanitize error message to avoid leaking sensitive information
      const errorMessage = error instanceof Error
        ? error.message
        : 'Unknown error';
      req.curlcmd = 'Error converting request to curl format: '
        + `${errorMessage}. Please report at `
        + 'https://github.com/AungMyoKyaw/curl-express/issues';
    }
    next();
  };
}

export default curlExpressMiddleware;

// Support CommonJS require()
module.exports = curlExpressMiddleware;
module.exports.default = curlExpressMiddleware;
