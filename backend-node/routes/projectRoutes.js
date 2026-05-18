const router=
require('express').Router()

const controller=
require('../controllers/projectController')

const auth=
require('../middleware/authMiddleware')

router.use(auth)

router.get(
'/',
controller.getProjects
)

router.get(
'/:id',
controller.getProject
)

router.post(
'/create',
controller.createProject
)

router.put(
'/:id',
controller.updateProject
)

router.delete(
'/:id',
controller.deleteProject
)

router.put(
'/:id/archive',
controller.archiveProject
)

router.put(
'/:id/restore',
controller.restoreProject
)

module.exports=
router