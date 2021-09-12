import { IDelta } from "./IDelta";

export interface IOrderBook {
    bid: Array<IDelta>,
    ask: Array<IDelta>
}