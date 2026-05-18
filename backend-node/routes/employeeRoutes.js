const router=
require('express').Router()

const auth=
require('../middleware/authMiddleware')

const controller=
require('../controllers/employeeController')

router.use(auth)

router.get(
'/',
controller.getEmployees
)

router.post(
'/create',
controller.createEmployee
)

module.exports=
router