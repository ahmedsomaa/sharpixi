import { query } from 'express-validator';

export const resizeQueryValidator = [
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

export const convertQueryValidator = [
  query('filename')
    .not()
    .isEmpty()
    .withMessage('cannot be empty')
    .isString()
    .withMessage('msut be a string'),
  query('format')
    .not()
    .isEmpty()
    .withMessage('cannot be empty')
    .custom((val) => ['png', 'jpg', 'svg', 'avif', 'jpeg', 'webp'].includes(val))
    .withMessage((ext) => `.${ext ? ext : 'ext'} is not supprted`)
];
