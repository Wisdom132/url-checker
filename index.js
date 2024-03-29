const http = require("http");
const https = require("https");
const url = require("url");

function getHeaders(myURL) {
    const parsedURL = url.parse(myURL);
    const options = {
        protocol: parsedURL.protocol,
        hostname: parsedURL.hostname,
        method: "HEAD",
        path: parsedURL.path,
    };
    let protocolHandler = parsedURL.protocol === "https:" ? https : http;

    return new Promise((resolve, reject) => {
        let req = protocolHandler.request(options, (res) => {
            resolve(res.headers);
        });
        req.on("error", (e) => {
            reject(e);
        });
        req.end();
    });
}

http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    };
    if (req.method == 'POST') {
        console.log('called')
        whole = ''
        req.on('data', (chunk) => {
            whole += chunk.toString()
        })
        req.on('end', () => {
            let jsondata = JSON.parse(whole)

            getHeaders(
                    jsondata.url
                ).then((headers) => {
                    res.writeHead(200, 'OK', {
                        'Content-Type': 'application/json'
                    })
                    res.write(JSON.stringify(headers))
                    res.end()
                })
                .catch(err => {
                    console.log('not found')
                    res.writeHead(500, 'Not found', {
                        'Content-Type': 'application/json'
                    })
                    res.send(JSON.stringify(err))
                });
        })
    }
}).listen(8080)