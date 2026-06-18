import { get } from "../index";
import Routes from "./Routes";

const CategoryService = {
  getCategories: async (params) => {
    const result = await get(Routes.getCategories, params);
    return result;
  },
};

export default CategoryService;