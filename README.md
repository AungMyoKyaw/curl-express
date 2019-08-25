# [curl-express][curl-express]

> convert request to curl cmd

[![Build Status][travis]][travis-url]
[![code style: prettier][prettier]][prettier-url]
[![npm][npm-download]][npm-dl-url]
[![contributions welcome][contri]][contri-url]
[![License: MIT][license]][license-url]

## Install

```shell
npm install curl-express
```

## Usage

**Make sure curl-express middleware is placed after body paser,multipart handling middlewares**

```javascript
const express = require('express');
const curlExpress = require('curl-express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// curl-express middleware
// it is placed after body paser,multipart handling middlewares
app.use(curlExpress);

app.all('*', (req, res) => {
  const { curlcmd } = req;
  console.log(curlcmd);
  // => curl -X GET 'http://localhost:3000/' -H 'host: localhost:3000' -H 'connection: keep-alive' -H 'upgrade-insecure-requests: 1' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' -H 'sec-fetch-mode: navigate' -H 'sec-fetch-user: ?1' -H 'dnt: 1' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'sec-fetch-site: none' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: my,en-US;q=0.9,en;q=0.8' -H 'cookie: test=test' -H 'if-none-match: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"'
  res.send(curlcmd);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

## Development

### Docker Build

```shell
docker-compose build
```

### Docker Run

```shell
docker-compose run curl-express
```

### Install Dependencies

```shell
npm i
```

### Run Test

```shell
npm t
```

## License

MIT © [Aung Myo Kyaw](https://github.com/AungMyoKyaw)

[curl-express]: https://github.com/AungMyoKyaw/curl-express
[contri]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square
[contri-url]: https://github.com/AungMyoKyaw/curl-express/issues
[travis]: https://img.shields.io/travis/AungMyoKyaw/curl-express/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/AungMyoKyaw/curl-express
[npm-download]: https://img.shields.io/npm/dt/curl-express.svg?style=flat-square
[npm-dl-url]: https://www.npmjs.com/package/curl-express
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
