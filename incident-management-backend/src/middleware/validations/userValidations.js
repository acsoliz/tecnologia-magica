import {body} from 'express-validator'
import { validationResult } from "express-validator";

function validatorErrorHandler  (req, res, next) {
    // Comprobar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Enviar un mensaje de error simple
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    // Si no hay errores, pasar el control al siguiente middleware
    next();
}

export const createUserValidations = [[
    // Validar el campo username
    body('username')
      .isString()
      .withMessage('El username debe ser una cadena de texto.')
      .notEmpty()
      .withMessage('El username es obligatorio.'),

    // Validar el campo password
    body('password')
      .isString()
      .withMessage('El password debe ser una cadena de texto.')
      .notEmpty()
      .withMessage('El password es obligatorio.')
  ], validatorErrorHandler]