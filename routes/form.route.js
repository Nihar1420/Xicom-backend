const formRouter = require('express').Router();
const { submitForm } = require('../controllers/form.controller');
const upload = require('../middleware/multer.middleware');

formRouter.post('/submitForm', upload.array('documents', 10), submitForm);

module.exports = formRouter;