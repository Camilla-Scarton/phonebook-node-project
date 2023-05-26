// to wrap async functions and handle the try/catch automatically
const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

/**
 * @description Get all contacts
 * @route GET /api/contacts
 * @access public
 */
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

/**
 * @description Get contact by id
 * @route GET /api/contacts/:id
 * @access public
 */
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw Error("Contact not found");
    }

    res.status(200).json(contact);
})

/**
 * @description Create new contact
 * @route POST /api/contacts/
 * @access public
 */
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw Error("All fields are mandatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    })

    res.status(201).json(contact);
})

/**
 * @description Update contact by id
 * @route PUT /api/contacts/:id
 * @access public
 */
const updateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedContact);
})

/**
 * @description Delete contact by id
 * @route DELETE /api/contacts/:id
 * @access public
 */
const deleteContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw Error("Contact not found");
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.status(200).json(contact);
})

module.exports = { getContacts, getContactById, createContact, updateContactById, deleteContactById };