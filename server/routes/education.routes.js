import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import educationCtrl from '../controllers/education.controller.js';

const router = express.Router();

router
  .route('/api/education')
  .get(educationCtrl.list) // public read
  .post(
    authCtrl.requireSignin,
    authCtrl.isAdmin,
    educationCtrl.create
  );

router
  .route('/api/education/:educationId')
  .get(educationCtrl.read)
  .put(
    authCtrl.requireSignin,
    authCtrl.isAdmin,
    educationCtrl.update
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.isAdmin,
    educationCtrl.remove
  );

router.param('educationId', educationCtrl.educationByID);

export default router;