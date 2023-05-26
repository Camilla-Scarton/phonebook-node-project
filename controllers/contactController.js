// to wrap async functions and handle the try/catch automatically
const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

/**
 * @description Get all contacts (related to a user)
 * @route GET /api/contacts
 * @access private
 */
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

/**
 * @description Get contact by id
 * @route GET /api/contacts/:id
 * @access private
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
 * @description Create new contact (for a user)
 * @route POST /api/contacts/
 * @access private
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
        user_id: req.user.id,
    })

    res.status(201).json(contact);
})

/**
 * @description Update contact by id
 * @route PUT /api/contacts/:id
 * @access private
 */
const updateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw Error("Contact not found");
    }

    // if a user tries to change another user contacts...
    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User cannot update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedContact);
})

/**
 * @description Delete contact by id
 * @route DELETE /api/contacts/:id
 * @access private
 */
const deleteContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw Error("Contact not found");
    }

    // if a user tries to delete another user contacts...
    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User cannot delete other user contacts");
    }

    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json(contact);
})

module.exports = { getContacts, getContactById, createContact, updateContactById, deleteContactById };