import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'

export class Server {

    private app

    private privateKey = fs.readFileSync('C:/Certbot/live/tau-video.xyz/privkey.pem', 'utf8')
    private certificate = fs.readFileSync('C:/Certbot/live/tau-video.xyz/cert.pem', 'utf8')
    private ca = fs.readFileSync('C:/Certbot/live/tau-video.xyz/chain.pem', 'utf8')

    private credentials = {
        key: this.privateKey,
        cert: this.certificate,
        ca: this.ca
    }

    constructor() {
        this.app = express()
        this.use()
    }

    public listen(port: number, callback: any) {

        const httpServer = http.createServer(this.app);
        const httpsServer = https.createServer(this.credentials,this.app);

        httpServer.listen(80, () => {
            console.log('HTTP Server running on port 80');
        });

        httpsServer.listen(443, () => {
            console.log('HTTP Server running on port 443');
            callback(this.app)
        });
        
    }

    private use() {
        this.app.use(express.static(process.env.APP_PATH + "/ui"))
        this.app.use(express.json());
    }
}