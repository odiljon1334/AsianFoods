import axios from "axios";
import { serverApi } from "../../lib/config";
import { Order, OrderItemInput } from "../../lib/types/order";
import { CartItem } from "../../lib/types/search";


class OrderService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async createOrder(input: CartItem[]): Promise<Order> {
        try {
            const orderItem: OrderItemInput[] = input.map((cartItem: CartItem) => {
                return {
                    itemQuantity: cartItem.quantity,
                    itemPrice: cartItem.price,
                    productId: cartItem._id,
                };
            });

            const url = this.path + "/order/create";
            const result = await axios.post(url, orderItem, {
                withCredentials: true,
            });
            console.log("ordersItem:", result);

            return result.data;
        } catch (err) {
            console.log("Error, createOrder", err);
            throw err;
        }
    } 
}

export default OrderService;