import toast, { Toaster, ToastOptions } from "react-hot-toast";
import { CSSProperties } from 'react';

declare type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';
declare type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
declare type Renderable = JSX.Element | string | null;
interface IconTheme {
    primary: string;
    secondary: string;
}
declare type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
declare type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
declare const resolveValue: <TValue, TArg>(valOrFunction: ValueOrFunction<TValue, TArg>, arg: TArg) => TValue;

const Notifications = () => {
  
  interface Toast {
    type: ToastType;
    id: string;
    message: ValueOrFunction<Renderable, Toast>;
    icon?: Renderable;
    duration?: number;
    pauseDuration: number;
    position?: ToastPosition;
    ariaProps: {
        role: 'status' | 'alert';
        'aria-live': 'assertive' | 'off' | 'polite';
    };
    style?: CSSProperties;
    className?: string;
    iconTheme?: IconTheme;
    createdAt: number;
    visible: boolean;
    height?: number;
} 
  let theme: Partial<Pick<Toast, "style" | "className" | "id" | "icon" | "position" | "duration" | "ariaProps" | "iconTheme">> = {
    duration: 2000,
    theme: {
      primary: "green",
      secondary: "black",
    }
  } as Partial<Pick<Toast, "style" | "className" | "id" | "icon" | "position" | "duration" | "ariaProps" | "iconTheme">>;
  return (
    <Toaster
      position="top-right"
      gutter={6}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: theme,
      }}
    />
  );
};

Notifications.success = (message: string, options?: ToastOptions) => {
  toast.success(message);
};
Notifications.error = (message: string, options?: ToastOptions) => {
  toast.error(message);
};

export { Notifications };
