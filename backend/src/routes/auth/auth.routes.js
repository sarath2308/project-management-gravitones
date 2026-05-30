import { Router } from 'express';
import { validateRequest } from '../../middleware/validated.request.js';
import { loginUserSchema, registerUserSchema } from '../../validation/auth/auth.schema.js';

export function authRoutes(authController) {
  const router = Router();

  router.post(
    '/register',
    validateRequest(registerUserSchema),
    authController.register.bind(authController)
  );
  router.post(
    '/login',
    validateRequest(loginUserSchema),
    authController.login.bind(authController)
  );

  return router;
}
