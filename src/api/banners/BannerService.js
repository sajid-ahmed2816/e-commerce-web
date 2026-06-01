import { get } from "../index";
import routes from "./routes";

const BannerService = {
  getBanner: async () => {
    const result = await get(routes.getBanners);
    return result;
  },
};

export default BannerService;