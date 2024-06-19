const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    dob: {
        type: Date,
    },
    residentialAddress: {
        type: String,
    },
    permanentAddress: {
        type: String,
    },
    documents: {
        type: [
            {
                fileName: {
                    type: String,
                },
                fileType: {
                    type: String,
                },
                filePath: {
                    type: String,
                }
            }
        ],
    }
});

const Form = mongoose.model('Form', FormSchema);
module.exports = Form;