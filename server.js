const http = require('http');
const promisify = require('util').promisify;
const appendFile = promisify(require('fs').appendFile);
const port = 3000;

const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        const { method, httpVersion, url, headers } = req;
        const datetime = new Date();
        log({ datetime, method, httpVersion, url, headers, body });
        res.statusCode = 200;
        res.end('🙋 Your request has been logged 📓');
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function log(o) {
    const str = JSON.stringify(o, null, ' ') + ',\r\n\r\n';
    console.log(str);
    appendFile('./node-http-log.json', str);
}