const router=
require('express').Router()

const auth=
require('../middleware/authMiddleware')

const controller=
require('../controllers/clientController')

router.use(auth)

router.get(
'/',
controller.getClients
)

router.post(
'/create',
controller.createClient
)

module.exports=
router