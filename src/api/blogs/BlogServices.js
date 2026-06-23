import { get } from "../index";
import Routes from "./Routes";

const BlogServices = {
  getBlogs: async (params) => {
    const result = await get(Routes.getBlogs, params);
    return result;
  },
};

export default BlogServices;