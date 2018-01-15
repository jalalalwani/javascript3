//' use strict';

// const http = require('http');
// const server = http.createServer((req, res) => {
//     console.log('creating server')
// });

// server.on('connection', () => {
//     console.log('connected')
// });

// server.on('request', (req, res) => {
//     console.log('request');
//     res.setHeader('content-type', 'text/html')
//     res.write('<h1>some Header</h1>');
//     res.end();
// })
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log('listening on', PORT);
// });
let state = 10;
const http = require('http');
const server = http.createServer();
const PORT = 8080;

server.listen(PORT, () => {
    console.log('listening on', PORT);
});

server.on('connection', () => {
    console.log('connected')
});

server.on('request', (req, res) => {
    console.log('request', req.url);
    switch (req.url) {
        case 'state':
            stasteCase(state);    
            break;
        case 'add':
            stasteCase(state++); 
            break;
        case 'remove': 
            stasteCase(state--);    
            break;
        // case 'reset':
        //     break;
        // default:
        //     state = 'error code 404: Not found with a friendly message and do not change the state variable';
    }

})
function stasteCase(state) {
    res.setHeader('content-type', 'text/html')
    res.write('<h2>' + state + '</h2>');
    res.end();
}

