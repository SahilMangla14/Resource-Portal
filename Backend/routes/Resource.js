const express = require('express')
const router = express.Router()
const {getAllResources, getResourceById, addResource , updateResource, deleteResource, deleteAllResources, getTopKResourcesForLikes, getResourcesForYear, getResourcesForCourseCode} = require('../controllers/resourceController.js')

router.get('/',getAllResources).get('/:id',getResourceById).get('/top/:k',getTopKResourcesForLikes).get('/year/:year',getResourcesForYear).get('/course/:courseCode',getResourcesForCourseCode)
router.post('/add',addResource)
router.put('/update/:id',updateResource)
router.delete('/delete/:id',deleteResource).delete('/deleteAll',deleteAllResources)

module.exports = router