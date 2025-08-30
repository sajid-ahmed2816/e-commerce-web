import { get } from "../index";
import Routes from "./Routes";

const ProductService = {
  getProducts: async () => {
    const result = await get(Routes.getProducts);
    return result;
  },
};

export default ProductService;