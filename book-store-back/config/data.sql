INSERT INTO likes (user_id, book_id) VALUES (1, 1);
INSERT INTO likes (user_id, book_id) VALUES (1, 2);
INSERT INTO likes (user_id, book_id) VALUES (1, 3);
INSERT INTO likes (user_id, book_id) VALUES (3, 1);
INSERT INTO likes (user_id, book_id) VALUES (4, 4);
INSERT INTO likes (user_id, book_id) VALUES (2, 1);
INSERT INTO likes (user_id, book_id) VALUES (2, 3);
INSERT INTO likes (user_id, book_id) VALUES (2, 5);

DELETE FROM likes WHERE user_id = 1 AND book_id = 1;

SELECT count(*) FROM LIKES WHERE book_id = 1;

SELECT *, (SELECT count(*) FROM likes WHERE book_id = books.id) AS likes FROM books;


-- // 장바구니 담기
INSERT INTO cartItems (book_id, quantity, user_id) VALUES(1, 1, 1);

-- 장바구니 조회
SELECT cartItems.id, book_id, title, summary, quantity, price  FROM cartItems 
LEFT JOIN books ON books.id = cartItems.book_id WHERE user_id = 1;

-- 장바구니 아이템 삭제
DELETE FROM cartItems WHERE id = 1;


-- 주문하기
-- 배송정보 입력 
INSERT INTO delivery (address, receiver, contact) VALUES ('서울시 중구', '김성령', '010-1111-1111');
-- 주문 정보 입력
INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES("어린왕자들", 3, 6000, 1, 1);
-- 주문 상세 목록 입력
INSERT INTO orderedBook (order_id, book_id, quantity) VALUES (1, 1, 1);
INSERT INTO orderedBook (order_id, book_id, quantity) VALUES (1, 3, );

-- 결제된 장바구니 삭제
DELETE FROM cartItems WHERE id IN (1,2,3, ~~~)



SELECT orders.id, book_title, total_quantity, total_price, created_at, delivery.address, delivery.receiver, delivery.contact
FROM orders LEFT JOIN delivery
ON orders.delivery_id = delivery.id;