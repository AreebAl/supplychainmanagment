import { body } from 'express-validator';

// Validation rules for creating a checklist
export const createChecklistValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
  body('questions.*.type').isIn(['boolean', 'dropdown', 'multiple_choice', 'text', 'image']).withMessage('Invalid question type'),
  body('questions.*.question').notEmpty().withMessage('Question is required'),
];

// Validation rules for updating a checklist
export const updateChecklistValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
  body('questions.*.type').isIn(['boolean', 'dropdown', 'multiple_choice', 'text', 'image']).withMessage('Invalid question type'),
  body('questions.*.question').notEmpty().withMessage('Question is required'),
];

// Validation rules for uploading images
export const uploadImagesValidationRules = () => [
  body('loading').optional().isURL().withMessage('Invalid loading image URL'),
  body('unloading').optional().isURL().withMessage('Invalid unloading image URL'),
];
