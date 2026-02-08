import { Router } from 'express';
import { adminController } from './admin.controller';
import {
  createTechnicianValidation,
  updateUserStatusValidation,
  createBuildingValidation,
} from './admin.validation';
import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management endpoints (requires ADMIN role)
 */

// All admin routes require authentication and ADMIN role
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN']));

/**
 * @swagger
 * /admin/technicians:
 *   post:
 *     summary: Create a new technician user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *               - employee_id
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: tech@miuegypt.edu.eg
 *               password:
 *                 type: string
 *                 format: password
 *                 example: TechPass123!
 *               first_name:
 *                 type: string
 *                 example: Ahmed
 *               last_name:
 *                 type: string
 *                 example: Hassan
 *               employee_id:
 *                 type: string
 *                 example: EMP001
 *               department:
 *                 type: string
 *                 example: IT Support
 *               specialization:
 *                 type: string
 *                 example: Network Infrastructure
 *               building_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ["550e8400-e29b-41d4-a716-446655440000"]
 *     responses:
 *       201:
 *         description: Technician created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 *   get:
 *     summary: Get all technicians
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all technicians
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 */
// POST /admin/technicians - Create a new technician
router.post(
  '/technicians',
  createTechnicianValidation,
  adminController.createTechnician.bind(adminController)
);

// GET /admin/technicians - Get all technicians
router.get(
  '/technicians',
  adminController.getAllTechnicians.bind(adminController)
);

/**
 * @swagger
 * /admin/users/{id}/status:
 *   patch:
 *     summary: Update user active status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_active
 *             properties:
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: User not found
 */
// PATCH /admin/users/:id/status - Update user active status
router.patch(
  '/users/:id/status',
  updateUserStatusValidation,
  adminController.updateUserStatus.bind(adminController)
);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 */
// GET /admin/users - Get all users
router.get(
  '/users',
  adminController.getAllUsers.bind(adminController)
);

/**
 * @swagger
 * /admin/buildings:
 *   get:
 *     summary: Get all buildings
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all buildings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Building'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 *   post:
 *     summary: Create a new building
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Medical Building
 *               code:
 *                 type: string
 *                 example: MED
 *               address:
 *                 type: string
 *                 example: South Wing
 *     responses:
 *       201:
 *         description: Building created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin role required
 */
// GET /admin/buildings - Get all buildings
router.get(
  '/buildings',
  adminController.getAllBuildings.bind(adminController)
);

// POST /admin/buildings - Create a new building
router.post(
  '/buildings',
  createBuildingValidation,
  adminController.createBuilding.bind(adminController)
);

export default router;
