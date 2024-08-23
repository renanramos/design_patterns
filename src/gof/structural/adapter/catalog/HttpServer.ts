import express, {Request, Response} from "express";

export default interface HttpServer {

    register(method: string, url: string, callback: Function): void;
    listen(port: number): void;
}

export class ExpressAdapter implements HttpServer{
    app: any;

    constructor () {
        this.app = express();
    }

    register(method: string, url: string, callback: Function): void {
        this.app[method](url, async function(req: Request, res: Response) {
            const output = await callback(req.params, req.body);
            res.json(output);
        });
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}
