const express = require('express')
const router = express.Router()
const {
    createComment,
    getAllComments,
    getCommentById,
    getCommentByResourceId,
    getCommentByUserId,
    getCommentByUserIdAndResourceId,
    updateComment,
    deleteComment,
    deleteAllComments
} = require('../controllers/commentController.js')

router.get('/', getAllComments).get('/:id', getCommentById).get('/resource/:resourceId', getCommentByResourceId).get('/user/:userId', getCommentByUserId).get('/user/:userId/resource/:resourceId', getCommentByUserIdAndResourceId)
router.post('/create', createComment)
router.put('/update/:id', updateComment)
router.delete('/delete/:id', deleteComment).delete('/deleteAll', deleteAllComments)

module.exports = router

