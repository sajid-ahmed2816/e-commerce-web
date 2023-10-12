import { post, get } from "../index";
import authRoutes from "./auth.routes";

const AuthServices = {
  signin: async (obj) => {
    const data = await post(authRoutes.signIn, obj);
    return data;
  },
  login: async (obj) => {
    const data = await get(authRoutes.login, obj);
    return data;
  },
};

export default AuthServices;
