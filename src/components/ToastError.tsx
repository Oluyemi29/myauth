import toast from "react-hot-toast";

const ToastError = ( errorMessage: string) => {
  "use client"
  toast.error(errorMessage);
};

export default ToastError;
