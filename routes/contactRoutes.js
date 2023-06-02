const express = require("express");
const router = express.Router();

const { getContacts, getContactById, createContact, updateContactById, deleteContactById } = require("../controllers/contactController");
const validateToken = require("../middlewares/validateTokenHandler");

// to protect all the routes (contacts can be seen/modified only by the user linked to them)
router.use(validateToken);

/** 
 * @path GET / POST http://localhost:PORT/api/contacts
 */
router.route("/").get(getContacts).post(createContact);;

/**
 * @path GET / PUT / DELETE http://localhost:PORT/api/contacts/:id
 */
router.route("/:id").get(getContactById).put(updateContactById).delete(deleteContactById);

module.exports = router;