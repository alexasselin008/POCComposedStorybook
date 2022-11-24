const express = require("express");
const next = require("next");
const { createServer } = require("https");
const fs = require("fs");
const path = require("path");
const homeDir = require("os").homedir();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const { createProxyMiddleware } = require("http-proxy-middleware");

const handle = app.getRequestHandler();


const devCertPath = path.join(homeDir, ".sharegate", "localhost.pfx");

const port = process.env.PORT || 3001;

const httpsOptions = {
    pfx: fs.readFileSync(path.resolve(devCertPath)),
    passphrase: "changeit"
};

const apiPaths = {
    "/backend": {
        target: "https://localhost:5003",
        secure: false
    }
};

app.prepare().then(() => {
    const server = express();

    server.use("/backend", createProxyMiddleware(apiPaths["/backend"]));

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    createServer(httpsOptions, server).listen(port, err => {
        if (err) {throw err;}
        console.log(`> Server started on https://localhost:${port}`);
    });
});
