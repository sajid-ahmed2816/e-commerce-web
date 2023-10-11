import { post } from "../index";
import authRoutes from "./auth.routes";

const AuthServices = {
  login: async (obj) => {
    const data = await post(authRoutes.signIn, obj);
    return data;
  },
};

export default AuthServices;
