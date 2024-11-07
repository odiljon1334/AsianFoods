import {Product} from "./product";
import {Member} from "./member";

/** REACT APP STATE **/
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState;
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