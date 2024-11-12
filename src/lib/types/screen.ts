import {Product} from "./product";
import {Member} from "./member";
import { Order } from "./order";

/** REACT APP STATE **/
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState;
    ordersPage: OrdersPageState;
};

/** HOMEPAGE PAGE **/
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
};

/** PRODUCTS PAGE **/
export interface ProductsPageState {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
};

/** ORDERS PAGE **/
export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}