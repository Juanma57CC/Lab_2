import Contact from '../models/contact.model.js';

const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res
      .status(201)
      .json({ message: 'Message received', contact });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ created: -1 }).exec();
    return res.json(contacts);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id).exec();
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve contact' });
  }
};

const read = (req, res) => res.json(req.contact);

const remove = async (req, res) => {
  try {
    await req.contact.deleteOne();
    return res.json({ message: 'Contact deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default { create, list, contactByID, read, remove };