import express from 'express';
import { createOrderController, getOrdersController, getOrderByIdController, updateOrderController, deleteOrderController } from '../controller/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createOrderValidationRules,updateOrderValidationRules } from '../validation/orderValidation.js';
const orderRouter = express.Router();

orderRouter.route('/')
  .post(protect, authorize('procurement_manager', 'admin'), createOrderValidationRules(),createOrderController)
  .get(protect, authorize('procurement_manager', 'admin', 'inspection_manager'), getOrdersController);

orderRouter.route('/:id')
  .get(protect, authorize('procurement_manager', 'admin', 'inspection_manager', 'client'), getOrderByIdController)
  .put(protect, authorize('procurement_manager', 'admin','inspection_manager'),updateOrderValidationRules(), updateOrderController)
  .delete(protect, authorize('admin'), deleteOrderController);

export default orderRouter;
