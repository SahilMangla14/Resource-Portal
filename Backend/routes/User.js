const express = require('express')
const {authenticationMiddleware} = require('../middleware/auth')
const router = express.Router()
const {registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser,topContributors, logoutUser} = require('../controllers/userController')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',authenticationMiddleware,logoutUser)
router.get('/',getAllUsers).get('/getParticularUser',authenticationMiddleware,getUserById).put('/updateUser',authenticationMiddleware,updateUser)
router.delete('/deleteUser',authenticationMiddleware,deleteUser)
router.get('/topContributors',authenticationMiddleware,topContributors)
module.exports = router