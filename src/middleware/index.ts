import { query } from 'express-validator';

export const queryValidator = [
  query('filename')
    .not()
    .isEmpty()
    .withMessage('cannot be empty')
    .isString()
    .withMessage('msut be a string'),
  query('height')
    .not()
    .isEmpty()
    .withMessage('cannot be empty')
    .isInt()
    .withMessage('must be a number'),
  query('width')
    .not()
    .isEmpty()
    .withMessage('cannot be empty')
    .isInt()
    .withMessage('must be a number')
];
