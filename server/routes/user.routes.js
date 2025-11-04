import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/users')
  .post(userCtrl.create)
  .get(authCtrl.requireSignin, userCtrl.list)

router.delete('/api/users/removeMany',
  authCtrl.requireSignin,
  userCtrl.removeMany
)

router.param('userId', userCtrl.userByID)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

export default router