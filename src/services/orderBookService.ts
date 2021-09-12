import { Container, Service } from 'typedi';
import axios, { AxiosResponse } from 'axios';
import { IOrderBook } from '../models/IOrderBook';

@Service()
export class OrderBookService {

    readonly baseUrl: string = 'https://api.bittrex.com/v3';

    async getOrderBookAsync(market: string) {
        let url = this.baseUrl + '/markets/' + market + '/orderbook';
        let orderBookResponse;
        try {
            orderBookResponse = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        depth: 25
                    }
                });
        } catch (exception) {
            process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        }

        return orderBookResponse?.data;
    }
}