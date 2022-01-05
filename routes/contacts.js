const express = require('express')

const router = express.Router()
const Contact = require('../models/contacts')
const multer = require('multer');

const auth = require("../middleware/auth");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  //reject a file

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }


};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})



//Getting all contacts
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Adding a contact
router.post('/', auth, upload.single('image'), async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    address: req.body.address,
    image: req.file ? req.file.path : ''
  })
  try {
    const newContact = await contact.save()
    res.status(201).json(newContact)
  } catch (err) {
    res.status(400).json(err.message)
  }

})

//Updating a contact
router.patch('/:id', auth, upload.single('image'), getContact, async (req, res) => {
  if (req.body.name !== null) {
    res.contact.name = req.body.name
  }
  if (req.body.number !== null) {
    res.contact.number = req.body.number
  }
  if (req.body.image !== null) {
    res.contact.image = req.file ? req.file.path : req.body.image
  }

  if (req.body.email !== null) {
    res.contact.email = req.body.email
  }
  if (req.body.address !== null) {
    res.contact.address = req.body.address
  }


  try {
    const updatedContact = await res.contact.save()
    res.json(updatedContact)
  } catch (err) {
    res.status(400)

  }

})

//Deleting a contact
router.delete('/:id', auth, getContact, async (req, res) => {
  try {
    await res.contact.remove()
    await res.json({ message: 'Deleted successfully.' })
  } catch (err) {
    res.status(500).json({ message: 'failed to delete contact' })
  }
})

async function getContact(req, res, next) {
  let contact
  try {
    contact = await Contact.findById(req.params.id)
    if (contact === null) {
      return res.status(400).json({ message: 'Cannot find contact' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.contact = contact
  next()
}

module.exports = router