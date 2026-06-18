import { post } from "../index";
import Routes from "./Routes";

const OrderServices = {
  createOrder: async (obj) => {
    const result = await post(Routes.createOrder, obj);
    return result;
  }
};

export default OrderServices;