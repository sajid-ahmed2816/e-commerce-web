import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastifyVariants = {
  success: (message) => {
    toast.success(message, {
      position: "top-center",
      className: "toastify-success",
    });
  },
  warning: () => {
    toast.warning("Please select color and size");
  },
  error: () => {
    toast.error("Internal server error");
  },
};

export default { ToastifyVariants };
