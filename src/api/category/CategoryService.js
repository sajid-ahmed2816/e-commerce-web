import { get } from "../index";
import Routes from "./Routes";

const CategoryService = {
  getCategories: async () => {
    const result = await get(Routes.getCategories);
    return result;
  },
};

export default CategoryService;