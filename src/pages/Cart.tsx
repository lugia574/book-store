import styled from "styled-components";
import Title from "../components/commom/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useMemo, useState } from "react";
import Empty from "../components/commom/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/commom/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { showAlert, showComfirm } = useAlert();
  const navigate = useNavigate();
  const { carts, isEmpty, deleteCartItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckItem = (id: number) => {
    // 언체크
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else setCheckedItems((prev) => [...prev, id]);
  };

  const handlerDeleteItem = (id: number) => {
    // 삭제 행위
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price * cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상품을 선택해주세요");
      return;
    }
    // 주문서 작성
    const orderData: Omit<OrderSheet, "delivery"> = {
      items: checkedItems,
      totalQuantity,
      totalPrice,
      firstBookTitle: carts[0].title,
    };
    showComfirm("주문하시겠습니까?", () =>
      navigate("/order", { state: orderData })
    );
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {isEmpty ? (
          <Empty title="장바구니가 비었습니다." icon={<FaShoppingCart />} />
        ) : (
          <>
            <div className="contents">
              {carts.map((item) => (
                <CartItem
                  cart={item}
                  key={item.id}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handlerDeleteItem}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
              />
              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
      </CartStyle>
    </>
  );
};

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 12px 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }
      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }

    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;

export default Cart;
