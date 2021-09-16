import { toast, ToastPosition } from 'react-toastify';

interface OptionsType {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: any;
}

export function Notify(Message: string, success: boolean | string): void {
  const Options: OptionsType = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  if (success) {
    toast.success(Message, Options);
  } else {
    toast.error(Message, Options);
  }
}
