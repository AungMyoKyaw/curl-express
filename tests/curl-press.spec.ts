import { toCurl } from '../src/lib/tocurl';

test('curl-express', async () => {
  const reqObject = {
    headers: {
      host: 'localhost:3000',
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'my,en-US;q=0.9,en;q=0.8',
      'cache-control': 'max-age=0, no-cache',
      connection: 'keep-alive',
      'content-length': '16',
      'content-type': 'application/json',
      cookie: 'test=test,test=test; test=test',
      dnt: '1',
      'if-none-match': 'W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    },
    method: 'GET',
    protocol: 'http',
    originalUrl: '/test?query=test&fdafdfa=fdafdfdf%20%20%20%20afs',
    hostname: 'localhost:3000',
    body: {
      protocol: 'http',
      originalUrl: '/test?query=test&fdafdfa=fdafdfdf%20%20%20%20afs',
      hostname: 'localhost:3000'
    },
    other: {}
  };
  const curlCmd = `curl -X GET 'http://localhost:3000/test?query=test&fdafdfa=fdafdfdf%20%20%20%20afs' -H 'host: localhost:3000' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: my,en-US;q=0.9,en;q=0.8' -H 'cache-control: max-age=0, no-cache' -H 'connection: keep-alive' -H 'content-length: 16' -H 'content-type: application/json' -H 'cookie: test=test,test=test; test=test' -H 'dnt: 1' -H 'if-none-match: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"' -H 'sec-fetch-mode: navigate' -H 'sec-fetch-site: none' -H 'sec-fetch-user: ?1' -H 'upgrade-insecure-requests: 1' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' -d '{"protocol":"http","originalUrl":"/test?query=test&fdafdfa=fdafdfdf%20%20%20%20afs","hostname":"localhost:3000"}'`;
  expect(toCurl(reqObject)).toBe(curlCmd);
});
