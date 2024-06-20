const Form = require("../models/form.model");

const submitForm = async (req, res) => {
    try {
        const {
            name,
            dob,
            email,
            residentialAddress,
            sameAsResidential,
            permanentAddress,
            documentsfileName0,
            documentsfileName1,
            documentsfileType0,
            documentsfileType1
        } = req.body;
        const files = req.files;

        if (!name || !dob || !residentialAddress || !sameAsResidential || !email) {
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

        const fileNames = [documentsfileName0, documentsfileName1];
        const fileTypes = [
            documentsfileType0 === "application/pdf" ? "pdf" : "image",
            documentsfileType1 === "application/pdf" ? "pdf" : "image"
        ];

        const documents = files.map((file, index) => ({
            fileName: fileNames[index % fileNames.length],
            fileType: fileTypes[index % fileTypes.length],
            filePath: file.path,
        }));

        const newForm = new Form({
            name,
            dob,
            email,
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
