import express from 'express';
import upload from '../UTILITY/multerConfig.js';
import { createChecklistController, getChecklistsController, getChecklistByIdController, updateChecklistController, deleteChecklistController } from '../controller/checklistController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createChecklistValidationRules,updateChecklistValidationRules,uploadImagesValidationRules } from '../validation/checklistValidation.js';
const checklistRouter = express.Router();

checklistRouter.route('/')
  .post(protect, authorize('procurement_manager', 'admin'), upload.fields([{ name: 'loading', maxCount: 1 }, { name: 'unloading', maxCount: 1 }]),createChecklistValidationRules(),uploadImagesValidationRules(), createChecklistController)
  .get(protect, authorize('procurement_manager', 'admin', 'inspection_manager', 'client'), getChecklistsController);

checklistRouter.route('/:id')
  .get(protect, authorize('procurement_manager', 'admin', 'inspection_manager', 'client'), getChecklistByIdController)
  .put(protect, authorize('procurement_manager', 'admin'), upload.fields([{ name: 'loading', maxCount: 1 }, { name: 'unloading', maxCount: 1 }]),updateChecklistValidationRules,uploadImagesValidationRules, updateChecklistController)
  .delete(protect, authorize('admin'), deleteChecklistController);

export default checklistRouter;
