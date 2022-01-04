const express = require('express')

const router = express.Router()
const Contact = require('../models/contacts')

//Getting all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Adding a contact
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    number: req.body.number
  })
  try {
    const newContact = await contact.save()
    res.status(201).json(newContact)
  } catch (err) {
    res.status(400).json(err.message)
  }

})

//Updating a contact
router.patch('/:id', getContact, async (req, res) => {
  if (req.body.name !== null) {
    res.contact.name = req.body.name
  }
  if (req.body.number !== null) {
    res.contact.number = req.body.number
  }
  if (req.body.image !== null) {
    res.contact.image = req.body.image
  }

  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400)

  }

})

//Deleting a contact
router.delete('/:id', getContact, async (req, res) => {
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