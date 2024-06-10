import { Order } from '../model/order.js';

const createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

const getOrders = async () => {
  return await Order.find().populate('client').populate('checklist');
};

const getOrderById = async (id) => {
  return await Order.findById(id).populate('client').populate('checklist');
};

const updateOrder = async (id, orderData) => {
  return await Order.findByIdAndUpdate(id, orderData, { new: true });
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

export { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
