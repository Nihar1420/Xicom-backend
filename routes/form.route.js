const formRouter = require('express').Router();
const multer = require('multer');
const { submitForm } = require('../controllers/form.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

formRouter.post('/submitForm', upload.array('documents', 10), submitForm);

module.exports = formRouter;