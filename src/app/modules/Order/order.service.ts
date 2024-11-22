import { Order } from "./order.interface";
import { OrderModel } from "./order.model";



const createOrderIntoDB = async (order: Order) => {
    try {
        const result = await OrderModel.create(order);
        return result;
    } catch (err) {
        console.error('Error creating order:', err);
        throw new Error('Failed to create order');
    }
};

export const OrderServices = {
    createOrderIntoDB,
};
