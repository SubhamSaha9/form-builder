const express = require("express");
const { createForm, getForm, editForm, editFormField, submitForm, getUserForm, deleteForm } = require("../controllers/formController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-form", auth, createForm);
router.post("/get-form", auth, getForm);
router.post("/edit-form", auth, editForm);
router.post("/edit-field", auth, editFormField);
router.post("/submit-form", auth, submitForm);
router.post("/delete-form", auth, deleteForm);
router.get("/get-all-forms", auth, getUserForm);

module.exports = router;