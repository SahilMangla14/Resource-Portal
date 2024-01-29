const express = require('express')
const router = express.Router()
const { authenticationMiddleware } = require('../middleware/auth.js')
const {getAllResources, getResourceById, addResource , updateResource, deleteResource, deleteAllResources, getTopKResourcesForLikes, getResourcesForYear, getResourcesForCourseCode,getResourcesForUser, filterResources} = require('../controllers/resourceController.js')

router.get('/',authenticationMiddleware,getAllResources).get('/top/:k',authenticationMiddleware,getTopKResourcesForLikes).get('/year/:year',authenticationMiddleware,getResourcesForYear).get('/course/:courseCode',authenticationMiddleware,getResourcesForCourseCode).get('/course',authenticationMiddleware,getResourcesForUser)
router.post('/add',authenticationMiddleware,addResource)
router.put('/update/:id',authenticationMiddleware,updateResource)
router.delete('/delete/:id',authenticationMiddleware,deleteResource).delete('/deleteAll',authenticationMiddleware,deleteAllResources)
router.get('/filterResources',authenticationMiddleware,filterResources)
router.get('/:id',authenticationMiddleware,getResourceById)

module.exports = router
