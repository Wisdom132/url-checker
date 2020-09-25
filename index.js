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

// getHeaders(
//     "https://stackoverflow.com/questions/5922842/getting-http-headers-with-node-js"
// ).then((headers) => {
//     console.log(headers);
// });

http.createServer((req, res) => {
    if (req.method == 'POST') {
        whole = ''
        req.on('data', (chunk) => {

            // consider adding size limit here
            whole += chunk.toString()
        })

        req.on('end', () => {
            let jsondata = JSON.parse(whole)
            res.writeHead(200, 'OK', {
                'Content-Type': 'application/json'
            })
            getHeaders(
                jsondata.url
            ).then((headers) => {
                res.end(JSON.stringify(headers))
            }).catch(err => {
                res.end(JSON.stringify(err))
            });
        })
    }
}).listen(8080)