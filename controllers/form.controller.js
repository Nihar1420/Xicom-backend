const Form = require("../models/form.model");

const submitForm = async (req, res) => {
    try {
        const {
            name,
            dob,
            residentialAddress,
            sameAsResidential,
            permanentAddress,
        } = req.body;
        const files = req.files;

        if (!name || !dob || !residentialAddress || !sameAsResidential ) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the required fields"
            })
        }

        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "Age must be at least 18"
            });
        }

        if (!sameAsResidential && (!permanentAddress || permanentAddress === "")) {
            return res.status(400).json({
                success: false,
                message: "Permanent address is required"
            });
        }

        if (files?.length < 2) {
            return res.status(400).json({
                success: false,
                message: "At least two documents are required"
            });
        }

        const documents = files?.map((file) => ({
            fileName: file.originalname,
            fileType: file.mimetype,
            filePath: file.path,
        }));

        const newForm = new Form({
            name,
            dob,
            residentialAddress,
            permanentAddress: sameAsResidential ? "" : permanentAddress,
            documents,
        });
        await newForm.save();

        return res.status(200).json({
            success: true,
            message: "Form submitted successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const formController = { submitForm };
module.exports = formController;
