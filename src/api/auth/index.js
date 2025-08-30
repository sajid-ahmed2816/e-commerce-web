import { post, get } from "../index";
import authRoutes from "./auth.routes";

const AuthServices = {
  signup: async (obj) => {
    const data = await post(authRoutes.signup, obj);
    return data;
  },
  login: async (obj) => {
    const data = await post(authRoutes.login, obj);
    return data;
  },
  google: async (obj) => {
    const data = await post(authRoutes.google, obj);
    return data;
  },
};

export default AuthServices;
