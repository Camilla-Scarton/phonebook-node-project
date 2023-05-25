const express = require("express");
const router = express.Router();

/**
 * @method GET
 * @path http://localhost:PORT/api/contacts
 */
router.route("/").get((req, res) => {
    // res.status(200).send("Get all contacts");
    res.status(200).json({ message: "Get all contacts" });
})

/**
 * @method GET
 * @path http://localhost:PORT/api/contacts/:id
 */
router.route("/:id").get((req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
})

/**
 * @method POST
 * @path http://localhost:PORT/api/contacts
 */
router.route("/").post((req, res) => {
    res.status(200).json({ message: "Create contact" });
})

/**
 * @method PUT
 * @path http://localhost:PORT/api/contacts/:id
 */
router.route("/:id").put((req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
})

/**
 * @method DELETE
 * @path http://localhost:PORT/api/contacts/:id
 */
router.route("/:id").delete((req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
})

/**
 * @method GET
 * @path http://localhost:PORT/api/contacts
 */
router.route("/").get((req, res) => {
    // res.status(200).send("Get all contacts");
    res.status(200).json({ message: "Get all contacts" });
})

module.exports = router;