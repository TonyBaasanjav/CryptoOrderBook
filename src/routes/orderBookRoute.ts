import express from 'express';
import { Container, Inject } from 'typedi';
import { OrderBookController } from '../controllers/orderBookController';

const router = express.Router();

const orderBookController = Container.get<OrderBookController>(OrderBookController);
router.get('/ping', orderBookController.serverHealthCheck);
router.get('/', orderBookController.getFullOrderBook);

export = router;