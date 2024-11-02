import {Product} from "./product";
import {Member} from "./member";

/** REACT APP STATE **/
export interface AppRootState {
    homePage: HomePageState;
}

/** HOMEPAGE PAGE **/
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUCTS PAGE **/

/** ORDERS PAGE **/