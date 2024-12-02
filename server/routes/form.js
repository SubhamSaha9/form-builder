const express = require("express");
const { createForm, getForm, editForm } = require("../controllers/formController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-form", auth, createForm);
router.get("/:formId", auth, getForm);
router.post("/edit-form", auth, editForm);

module.exports = router;