import 'reflect-metadata'
import http from 'http';
import config from './config/config';
import express, { NextFunction, Request, Response } from "express";
import orderBookRoute from './routes/orderBookRoute';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// ** HEROKU MIDDLEWARE ** //
const whitelist = ['http://localhost:8080', 'https://radiant-garden-02540.herokuapp.com']
const corsOptions = {
  origin: function (origin: any, callback: any) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

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

// ** HEROKU CLIENT REDIRECTION ** //
const path = require('path');
if (process.env.NODE_ENV === 'production') {
// Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => {});