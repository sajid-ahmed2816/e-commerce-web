import { get } from "../index";
import Routes from "./Routes";

const ProductService = {
  getProducts: async (params) => {
    const result = await get(Routes.getProducts, params);
    return result;
  },
};

export default ProductService;