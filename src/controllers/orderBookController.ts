import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { IOrderBook } from '../models/IOrderBook';
import { OrderBookService } from '../services/orderBookService';

@Service()
export class OrderBookController {

    @Inject()
    private readonly orderBookService!: OrderBookService;

    serverHealthCheck = (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json({
            message: 'pong'
        });
    }
    
    getFullOrderBook = async (request: Request, response: Response, next: NextFunction) => {
        let orderBook = await this.orderBookService.getOrderBookAsync("ETH-BTC");
        return response.status(200).json({
            orderBook
        });
    }
}