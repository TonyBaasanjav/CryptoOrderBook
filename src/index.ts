import 'reflect-metadata'
import http from 'http';
import config from './config/config';
import express, { NextFunction, Request, Response } from "express";
import orderBookRoute from './routes/orderBookRoute';

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use((request: Request, response: Response, next: NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (request.method == 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});
    }

    next();
});

app.use('/api/orderBook', orderBookRoute);

app.use((request: Request, response: Response, next: NextFunction) => {
    const error = new Error('Not found');

    response.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => {});