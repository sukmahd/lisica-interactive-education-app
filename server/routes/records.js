const express = require('express')
const router = express.Router()
const controller = require('../controllers/recordController')

router.get('/:id', controller.getData)
// router.post('/:id', controller.postData)

module.exports = router;
