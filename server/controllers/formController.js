const Form = require("../models/form");

exports.createForm = async (req, res) => {
    const { form } = req.body;
    try {
        if (!form) {
            return res.status(200).json({
                success: false,
                message: "All fields are required",
            })
        }

        const newForm = await Form.create({
            form: form,
            createdBy: req.user.id,
        });

        return res.status(200).json({
            success: true,
            message: "Form Created Successfully",
            data: newForm
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getForm = async (req, res) => {
    const { formId } = req.params;
    try {
        if (!formId) {
            return res.status(200).json({
                success: false,
                message: "All fields are required",
            })
        }

        const form = await Form.findById(formId);
        return res.status(200).json({
            success: true,
            message: "Form Fetched Successfully",
            data: form
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.editForm = async (req, res) => {
    const { formId, form } = req.body;
    try {
        if (!form || !formId) {
            return res.status(200).json({
                success: false,
                message: "All fields are required",
            })
        }

        const newForm = await Form.findByIdAndUpdate(formId, { form: form }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Form updated Successfully",
            data: newForm
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.editFormField = async (req, res) => {
    const { formId, field, value } = req.body;
    try {
        if (!field || !formId || !value) {
            return res.status(200).json({
                success: false,
                message: "All fields are required",
            })
        }

        let newForm;

        if (field === "theme") {
            newForm = await Form.findByIdAndUpdate(formId, { theme: value }, { new: true });
        } else if (field === "background") {
            newForm = await Form.findByIdAndUpdate(formId, { background: value }, { new: true });
        } else {
            newForm = await Form.findByIdAndUpdate(formId, { style: value }, { new: true });
        }

        return res.status(200).json({
            success: true,
            message: "Form field updated Successfully",
            data: newForm
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}