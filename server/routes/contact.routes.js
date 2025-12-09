import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import contactCtrl from '../controllers/contact.controller.js';

const router = express.Router();

// public contact form
router.route('/api/contact').post(contactCtrl.create);

// admin-only inbox
router
  .route('/api/contact')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.list);

router
  .route('/api/contact/:contactId')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.read)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove);

router.param('contactId', contactCtrl.contactByID);

export default router;