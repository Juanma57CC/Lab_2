import User from '../models/user.model.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    return res.status(201).json({ message: 'Successfully signed up!' })
  } catch (err) {
    console.error('USER CREATE ERROR:', err)
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    const users = await User.find().select('_id name email created updated')
    return res.json(users)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' })
  }
}

const read = (req, res) => {
  const { _id, name, email, created, updated } = req.profile
  return res.json({ _id, name, email, created, updated })
}


const update = async (req, res) => {
  try {
    const user = req.profile
    if (typeof req.body.name === 'string') user.name = req.body.name
    if (typeof req.body.email === 'string') user.email = req.body.email
    if (typeof req.body.password === 'string' && req.body.password.length) {
      user.password = req.body.password
    }
    user.updated = Date.now()
    await user.save()

    const { _id, name, email, created, updated } = user
    return res.json({ _id, name, email, created, updated })
  } catch (err) {
    console.error('USER UPDATE ERROR:', err)
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const user = req.profile
    await user.deleteOne()
    return res.json({ message: 'User deleted' })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}


const removeMany = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    return res.status(200).json({
      message: `${result.deletedCount} users successfully deleted!`
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
export default { create, userByID, read, list, update, remove, removeMany };
