import { post } from "../index";
import PaymentRoutes from "./Payment.routes";

const PaymentService = {
  onlinePayment: async (obj) => {
    const result = await post(PaymentRoutes.onlinePayment, obj);
    return result;
  }
};

export default PaymentService;