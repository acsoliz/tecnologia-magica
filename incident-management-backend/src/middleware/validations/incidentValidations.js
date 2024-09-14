import { param, body, validationResult } from 'express-validator';

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

export const updateIncidentValidations = [[
    // Validar el parámetro id
    param('id')
      .isInt()
      .withMessage('El id debe ser un numero.')
      .notEmpty()
      .withMessage('El id es obligatorio.'),

    // Validar el campo status en el cuerpo de la solicitud
    body('status')
      .isString()
      .withMessage('El status debe ser una cadena de texto.')
      .notEmpty()
      .withMessage('El status es obligatorio.')
      .isIn(['OPEN', 'CLOSED']) // Asegúrate de que el status esté en los valores permitidos
      .withMessage('El status debe ser OPEN o CLOSED.')
], validatorErrorHandler ]

export const assignIncidentValidations = [
 // Validar el parámetro id
    param('id')
        .isInt()
        .withMessage('El id debe ser un numero.')
        .notEmpty()
        .withMessage('El id es obligatorio.'),

    // Validar el campo status en el cuerpo de la solicitud / esto es cuando un admin pide la informacion de un usuario
    body('userId')
        .optional()
        .isInt()
        .withMessage('El userId debe ser un numero.')
        .notEmpty()
        .withMessage('El userId es obligatorio.')
, validatorErrorHandler]


export const createIncidentValidations = [
    // Validar el campo title y priority en el cuerpo de la solicitud
    body('title')
        .isString()
        .withMessage('El title debe ser una cadena de texto.')
        .notEmpty()
        .withMessage('El title es obligatorio.'),
    body('priority')
        .isString()
        .withMessage('priority debe ser una cadena de texto.')
        .notEmpty()
        .withMessage('Priority es obligatorio.')
, validatorErrorHandler]