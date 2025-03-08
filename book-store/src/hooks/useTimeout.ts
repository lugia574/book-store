import { useEffect } from "react";

export const useTimeout = (callback: () => void, delay: number) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);

    return () => clearTimeout(timer);
  }, [callback, delay]);
};

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // 삭제
//       handleRemoveToast();
//     }, TOAST_REMOVE_DELAY);

//     return () => clearTimeout(timer);
//   }, []);
