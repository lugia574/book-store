import { useCallback } from "react";

export const useAlert = () => {
  const showAlert = useCallback((message: string) => {
    window.alert(message);
  }, []);

  const showComfirm = useCallback((message: string, onComfirm: () => void) => {
    if (window.confirm(message)) {
      onComfirm();
    }
  }, []);
  return { showComfirm, showAlert };
};
