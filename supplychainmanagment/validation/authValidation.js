import { body } from 'express-validator';

// Register user validation rules
const registerValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').notEmpty().withMessage('Role is required'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
];

// Login validation rules
const loginValidationRules = [
  body('email').optional().isEmail().withMessage('Invalid email').normalizeEmail(),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Create procurement manager validation rules
const createProcurementManagerValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
];

// Create inspection manager validation rules
const createInspectionManagerValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
];

// Assign inspection manager validation rules
const assignInspectionManagerValidationRules = [
  body('inspectionManagerId').notEmpty().withMessage('Inspection manager ID is required'),
  body('managerId').notEmpty().withMessage('Manager ID is required'),
];

// Unassign inspection manager validation rules
const unassignInspectionManagerValidationRules = [
  body('inspectionManagerId').notEmpty().withMessage('Inspection manager ID is required'),
];

export { 
  registerValidationRules,
  loginValidationRules,
  createProcurementManagerValidationRules,
  createInspectionManagerValidationRules,
  assignInspectionManagerValidationRules,
  unassignInspectionManagerValidationRules,
};
