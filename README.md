# curl-express

> Convert Express.js requests to cURL commands for debugging and logging

[![Build Status][azure]][azure-url]
[![code style: prettier][prettier]][prettier-url]
[![npm][npm-download]][npm-dl-url]
[![contributions welcome][contri]][contri-url]
[![License: MIT][license]][license-url]

## Install

```shell
npm install curl-express
# or
yarn add curl-express
# or
bun add curl-express
```

## Usage

**Important:** Place `curl-express` middleware after body parser and multipart handling middlewares.

### CommonJS

```javascript
const express = require('express');
const curlExpress = require('curl-express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// curl-express middleware
app.use(curlExpress());

// With omitted keys (hide sensitive headers)
// app.use(curlExpress({ omittedKeys: ['authorization', 'cookie'] }));

app.all('*', (req, res) => {
  console.log(req.curlcmd);
  res.send(req.curlcmd);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
```

### ES Modules / TypeScript

```typescript
import express, { Request, Response } from 'express';
import curlExpress from 'curl-express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(curlExpress({ omittedKeys: ['authorization', 'cookie'] }));

app.get('/api', (req: Request, res: Response) => {
  console.log(req.curlcmd); // TypeScript knows about req.curlcmd
  res.send('OK');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
```

## API

### `curlExpress(options?)`

Creates an Express middleware that attaches a `curlcmd` property to the request object.

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `omittedKeys` | `string[]` | `[]` | Array of header keys to omit from the cURL command. Useful for hiding sensitive headers like `authorization` or `cookie`. |

#### Returns

Express middleware function that adds `req.curlcmd` (string) to incoming requests.

### Example Output

```bash
curl -X GET 'http://localhost:3000/test?query=value' -H 'host: localhost:3000' -H 'accept: application/json' -H 'content-type: application/json'
```

## Development

### Prerequisites

- Node.js 14+
- npm, yarn, or bun

### Setup

```shell
# Clone the repository
git clone https://github.com/AungMyoKyaw/curl-express.git
cd curl-express

# Install dependencies
npm install
# or
bun install
```

### Commands

```shell
# Run tests
npm test

# Build
npm run build

# Lint
npm run lint

# Format code
npm run format
```

### Docker

```shell
# Build container
docker-compose build

# Run container
docker-compose run curl-express
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT - See [LICENSE](LICENSE) for details.

## Author

Aung Myo Kyaw - [GitHub](https://github.com/AungMyoKyaw)

[curl-express]: https://github.com/AungMyoKyaw/curl-express
[contri]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg
[contri-url]: https://github.com/AungMyoKyaw/curl-express/issues
[azure]: https://dev.azure.com/AungMyoKyaw/curl-express/_apis/build/status/curl-express?branchName=master
[azure-url]: https://dev.azure.com/AungMyoKyaw/curl-express/_build/latest?definitionId=3&branchName=master
[npm-download]: https://img.shields.io/npm/dt/curl-express.svg
[npm-dl-url]: https://www.npmjs.com/package/curl-express
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg
[license-url]: https://opensource.org/licenses/MIT
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
