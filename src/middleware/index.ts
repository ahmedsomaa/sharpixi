import { query } from 'express-validator';

export const queryValidator = [
  query('filename')
    .not()
    .isEmpty()
    .withMessage('filename cannot be empty')
    .isString()
    .withMessage('filename msut be a string'),
  query('height')
    .not()
    .isEmpty()
    .withMessage('height cannot be empty')
    .isInt()
    .withMessage('height must be a number'),
  query('width')
    .not()
    .isEmpty()
    .withMessage('width cannot be empty')
    .isInt()
    .withMessage('width must be a number')
];
