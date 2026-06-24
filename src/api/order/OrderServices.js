import { get, post } from "../index";
import Routes from "./Routes";

const OrderServices = {
  createOrder: async (obj) => {
    const result = await post(Routes.createOrder, obj);
    return result;
  },

  getOrderds: async (params) => {
    const result = await get(Routes.getOrders, params);
    return result;
  },

  getOrderDetailById: async (id) => {
    const result = await get(`${Routes.getOrderDetailById}/${id}`);
    return result;
  },
};

export default OrderServices;