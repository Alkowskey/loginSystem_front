import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastSuccess = (message: string) =>
  toast.success(message, {
    position: "bottom-center",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

export const showToastError = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const Toast = () => {
  return <ToastContainer />;
};

export default Toast;
