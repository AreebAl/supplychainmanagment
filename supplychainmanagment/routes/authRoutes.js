import express from 'express';
import {
  register,
  login,
  createProcurementManagerController,
  createInspectionManagerController,
  assignInspectionManagerController,
  unassignInspectionManagerController
} from '../controller/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

import {
  registerValidationRules,
  loginValidationRules,
  createProcurementManagerValidationRules,
  createInspectionManagerValidationRules,
  assignInspectionManagerValidationRules,
  unassignInspectionManagerValidationRules
} from '../validation/authValidation.js';

const authRoutes = express.Router();

// Register a user
authRoutes.post('/register',registerValidationRules, register);

// Login
authRoutes.post('/login',loginValidationRules, login);

// Create a procurement manager (Admin only)
authRoutes.post('/procurement-manager', protect, authorize('admin'), createProcurementManagerValidationRules,createProcurementManagerController);

// Create an inspection manager (Admin or Procurement Manager)
authRoutes.post('/inspection-manager', protect, authorize('admin', 'procurement_manager'),createInspectionManagerValidationRules, createInspectionManagerController);

// Assign an inspection manager (Admin only)
authRoutes.post('/assign-inspection-manager', protect, authorize('admin'), assignInspectionManagerValidationRules,assignInspectionManagerController);

// Unassign an inspection manager (Admin only)
authRoutes.post('/unassign-inspection-manager', protect, authorize('admin'),unassignInspectionManagerValidationRules, unassignInspectionManagerController);

export default authRoutes;
