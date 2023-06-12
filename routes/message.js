const { Router } = require('express');
const { check } = require('express-validator');
const { messagesPost, messagesGet} = require("../controllers/messages");
const { validateFields } = require("../middlewares");

const router = Router();

router.post('/',[
    check('body', 'El body es obligatorio').not().isEmpty(),
    check('author', 'El author es obligatorio').not().isEmpty(),
    validateFields
] , messagesPost);

router.get('/', messagesGet);

module.exports = router;
