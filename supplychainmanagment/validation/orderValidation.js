import { body } from 'express-validator';

const createOrderValidationRules = () => [
    body('client').notEmpty().withMessage('Client is required'),
    body('checklist').notEmpty().withMessage('Checklist is required'),
    body('status').notEmpty().withMessage('Status is required').isIn(['created', 'in_progress', 'completed']).withMessage('Invalid status')
  ];

  
const updateOrderValidationRules = () => [
    body('client').optional(),
    body('checklist').optional(),
    body('status').optional().isIn(['created', 'in_progress', 'completed']).withMessage('Invalid status')
  ];
  

  export{createOrderValidationRules,updateOrderValidationRules}