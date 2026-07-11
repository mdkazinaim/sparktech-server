import express from 'express';
import { SettingsController } from './settings.controller';
import { tenantResolver } from '../../app/middleware/tenantResolver';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Public route to fetch settings (needed for frontend initialization)
// Middleware tenantResolver ensures we connect to the right DB
router.get('/', tenantResolver, SettingsController.getSettings);

// Admin routes - In real app, add Auth middleware here
router.patch('/theme', tenantResolver, SettingsController.updateActiveTheme);
router.post('/theme', tenantResolver, SettingsController.addCustomTheme);
router.delete('/theme/:id', tenantResolver, SettingsController.deleteCustomTheme);
router.patch('/admin-info', 
  tenantResolver, 
  upload.single("logo"),
  (req, res, next) => {
    if (req.file) {
      req.body.logo = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    next();
  },
  SettingsController.updateAdminInfo
);

export const SettingsRoutes = router;
