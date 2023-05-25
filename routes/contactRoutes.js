const express = require("express");
const router = express.Router();

const { getContacts, getContactById, createContact, updateContactById, deleteContactById } = require("../controllers/contactController");

/**
 * @method GET
 * @path http://localhost:PORT/api/contacts
 */
router.route("/").get(getContacts);

/**
 * @method GET
 * @path http://localhost:PORT/api/contacts/:id
 */
router.route("/:id").get(getContactById);

/**
 * @method POST
 * @path http://localhost:PORT/api/contacts
 */
router.route("/").post(createContact);

/**
 * @method PUT
 * @path http://localhost:PORT/api/contacts/:id
 */
router.route("/:id").put(updateContactById);

/**
 * @method DELETE
 * @path http://localhost:PORT/api/contacts/:id
 */
router.route("/:id").delete(deleteContactById);

module.exports = router;