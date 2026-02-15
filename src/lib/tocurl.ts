import { Request } from 'express';

export interface CurlOptions {
  /** Array of header keys to omit from the curl command */
  omittedKeys?: string[];
}

interface InternalRequest {
  headers: Record<string, string>;
  protocol: string;
  originalUrl: string;
  hostname: string;
  method: string;
  body?: Record<string, unknown>;
}

/**
 * Converts an Express request object to a cURL command string.
 *
 * @param req - The Express request object or a compatible request object
 * @param options - Configuration options for the curl output
 * @returns A cURL command string representing the request
 *
 * @example
 * ```typescript
 * const curlCmd = toCurl(req, { omittedKeys: ['authorization', 'cookie'] });
 * console.log(curlCmd);
 * // Output: curl -X GET 'http://localhost:3000/api' -H 'host: localhost:3000'
 * ```
 */
function toCurl(
  req: InternalRequest | Request,
  options: CurlOptions = {}
): string {
  const { omittedKeys = [] } = options;
  const {
    headers = {},
    method,
    protocol,
    hostname: defaultHostName,
    originalUrl,
    body = {}
  } = req as InternalRequest;

  const { host: hostname = defaultHostName } = headers;
  const requestUrl = `${protocol}://${hostname}${originalUrl}`;

  // Build curl command parts
  const parts: string[] = [];

  // Add method
  parts.push(`curl -X ${method}`);

  // Add URL
  parts.push(`'${requestUrl}'`);

  // Add headers (filter out omitted keys)
  Object.entries(headers)
    .filter(([key]) => !omittedKeys.includes(key))
    .forEach(([key, value]) => {
      parts.push(`-H '${key}: ${value}'`);
    });

  // Add request body if present
  const bodyObj = body as Record<string, unknown>;
  const hasBody = bodyObj && Object.keys(bodyObj).length > 0;

  if (hasBody) {
    // Create a copy of body without omitted keys
    const filteredBody: Record<string, unknown> = {};
    Object.entries(bodyObj).forEach(([key, value]) => {
      if (!omittedKeys.includes(key)) {
        filteredBody[key] = value;
      }
    });

    if (Object.keys(filteredBody).length > 0) {
      parts.push(`-d '${JSON.stringify(filteredBody)}'`);
    }
  }

  return parts.join(' ');
}

export { toCurl };
export default toCurl;
