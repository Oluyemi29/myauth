import toast from "react-hot-toast";

const ToastSuccess = (successMessaged: string) => {
  "use client";
  toast.success(successMessaged);
};

export default ToastSuccess;
