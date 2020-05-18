const { createServer } = require('http');
const { readdirSync } = require('fs');

const port = 53134

createServer((req, res) => {
    let responseCode = 404;
    let content = '404 Error';

    if (req.url === '/') {
        responseCode = 200;
        content = readdirSync('./index.html');
    }

    res.writeHead(responseCode, {
        'content-type': 'text/html;charset=utf-8',
    });

    res.write(content);
    res.end();
})

.listen(port);