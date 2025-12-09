import Education from '../models/education.model.js';

const create = async (req, res) => {
  try {
    const education = new Education({
      ...req.body,
      createdBy: req.auth._id,
    });
    await education.save();
    return res.status(201).json(education);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const educations = await Education.find().sort({ startYear: -1 }).exec();
    return res.json(educations);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const educationByID = async (req, res, next, id) => {
  try {
    const education = await Education.findById(id).exec();
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    req.education = education;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve education' });
  }
};

const read = (req, res) => res.json(req.education);

const update = async (req, res) => {
  try {
    let education = req.education;
    Object.assign(education, req.body);
    education.updated = Date.now();
    await education.save();
    return res.json(education);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await req.education.deleteOne();
    return res.json({ message: 'Education deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default { create, list, educationByID, read, update, remove };