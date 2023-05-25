/**
 * @description Get all contacts
 * @route GET /api/contacts
 * @access public
 */
const getContacts = (req, res) => {
    res.status(200).json({ message: `Get all contacts` });
}

/**
 * @description Get contact by id
 * @route GET /api/contacts/:id
 * @access public
 */
const getContactById = (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
}

/**
 * @description Create new contact
 * @route POST /api/contacts/
 * @access public
 */
const createContact = (req, res) => {
    res.status(201).json({ message: "Create contact" });
}

/**
 * @description Update contact by id
 * @route PUT /api/contacts/:id
 * @access public
 */
const updateContactById = (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
}

/**
 * @description Delete contact by id
 * @route DELETE /api/contacts/:id
 * @access public
 */
const deleteContactById = (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
}

module.exports = { getContacts, getContactById, createContact, updateContactById, deleteContactById };