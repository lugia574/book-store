import { useEffect, useState } from "react";
import { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const deleteCartItem = (id: number) => {
    deleteCart(id).then(() => {
      setCarts((prev) => prev.filter((cart) => cart.id !== id));
    });
  };

  useEffect(() => {
    fetchCart().then((carts) => {
      setCarts(carts);
      setIsEmpty(carts.length === 0);
    });
  }, []);
  return { carts, isEmpty, deleteCartItem };
};
