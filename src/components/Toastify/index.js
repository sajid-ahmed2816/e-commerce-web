import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastifyVariants = {
  success: () => {
    toast.success("Product has been added to cart", {
      position: "top-center",
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
