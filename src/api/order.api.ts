import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./http";

export const order = async (orderData: OrderSheet) => {
  return await requestHandler<any, OrderSheet>("post", "/orders", orderData);
};

export const fetchOrders = async () => {
  return await requestHandler<Order[]>("get", "/orders");
  // const response = await httpClient.get<Order[]>("/orders");
  // return response.data;
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler<OrderDetailItem>("get", `/orders/${orderId}`);
  // const response = await httpClient.get<OrderDetailItem>(`/orders/${orderId}`);
  // return response.data;
};
