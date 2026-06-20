import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastify = {
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      className: "toastify-success",
    });
  },
  warning: (message) => {
    toast.warning(message);
  },
  error: (message) => {
    toast.error(message);
  },
};

export default toastify;
