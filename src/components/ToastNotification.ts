import { toast } from "react-toastify";

export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        icon: false,
        draggable: true,
        progress: undefined,
        theme:'colored'
    });
}
export const showErrorToast = (message: string) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        icon: false,
        draggable: true,
        progress: undefined,
        theme:'colored'
    });
}