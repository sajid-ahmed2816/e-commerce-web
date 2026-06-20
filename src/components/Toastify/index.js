import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastify = {
  success: (message) => {
    toast.success(message);
  },
  warning: (message) => {
    toast.warning(message);
  },
  error: (message) => {
    toast.error(message);
  },
};

export default toastify;
