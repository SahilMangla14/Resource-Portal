const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController')

router.post('/register',registerUser).post('/login',loginUser).get('/',getAllUsers).get('/:id',getUserById).put('/updateUser/:id',updateUser).delete('/deleteUser/:id',deleteUser)

module.exports = router