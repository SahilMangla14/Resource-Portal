const mongoose = require('mongoose')
const Comment = require('../models/Comment.js')
const Resource = require('../models/Resource.js')
const User = require('../models/User.js')

const createComment = async (req, res) => {
    try{
        const {text, resource, user, author} = req.body

        if(!text)
            return res.status(400).json({message: "Text is required!"})

        if(!resource)
            return res.status(400).json({message: "Resource is required!"})

        if(!user)
            return res.status(400).json({message: "User is required!"})

        if(!author)
            return res.status(400).json({message: "Author is required!"})

        // check if this resource exists
        const isResourceExist = await Resource.findById(resource)
        if(!isResourceExist)
            return res.status(404).json({message: "Resource not found!"})

        // check if this user exists
        const isUserExist = await User.findById(user)
        if(!isUserExist)
            return res.status(404).json({message: "User not found!"})

        const comment = new Comment({text, resource, user, author})
        await comment.save()
        res.status(200).json({message: "Comment created successfully!"})
    }
    catch(err){
        console.log("Error while creating comment")
        res.status(500).json({message: err.message})
    }
}


const getAllComments = async (req, res) => {
    try{
        const comments = await Comment.find()
        res.status(200).json({message: "Comments fetched successfully!", comments})
    }
    catch(err){
        console.log("Error while fetching comments")
        res.status(500).json({message: err.message})
    }
}


const getCommentById = async (req, res) => {
    try{
        const id = req.params.id
        const comment = await Comment.findById(id)

        if(!comment)
            return res.status(404).json({message: "Comment not found!"})


        res.status(200).json({message: "Comment fetched successfully!", comment})
    }
    catch(err){
        console.log("Error while fetching comment by id")
        res.status(500).json({message: err.message})
    }
}


// get Comment by resource id
const getCommentByResourceId = async (req, res) => {
    try{
        const id = req.params.resourceId
        const comments = await Comment.find({resource: id})

        res.status(200).json({message: "Comments fetched successfully!", comments})
    }
    catch(err){
        console.log("Error while fetching comments by resource id")
        res.status(500).json({message: err.message})
    }
}

// get Comment by user id
const getCommentByUserId = async (req, res) => {
    try{
        const id = req.params.userId
        const comments = await Comment.find({user: id})

        res.status(200).json({message: "Comments fetched successfully!", comments})
    }
    catch(err){
        console.log("Error while fetching comments by user id")
        res.status(500).json({message: err.message})
    }
}


// get Comment by user id and resource id
const getCommentByUserIdAndResourceId = async (req, res) => {
    try{
        const userId = req.params.userId
        const resourceId = req.params.resourceId
        const comments = await Comment.find({user: userId, resource: resourceId})

        res.status(200).json({message: "Comments fetched successfully!", comments})
    }
    catch(err){
        console.log("Error while fetching comments by user id and resource id")
        res.status(500).json({message: err.message})
    }
}

// update Comment
const updateComment = async (req, res) => {
    try{
        const id = req.params.id
        const comment = await Comment.findById(id)

        if(!comment)
            return res.status(404).json({message: "Comment not found!"})

        const result = await Comment.findByIdAndUpdate(id, req.body)
        res.status(200).json({message: "Comment updated successfully!", result})
    }
    catch(err){
        console.log("Error while updating comment")
        res.status(500).json({message: err.message})
    }
}


// delete Comment
const deleteComment = async (req, res) => {
    try{
        const id = req.params.id
        const comment = await Comment.findById(id)

        if(!comment)
            return res.status(404).json({message: "Comment not found!"})

        const result = await Comment.findByIdAndDelete(id)
        res.status(200).json({message: "Comment deleted successfully!", result})
    }
    catch(err){
        console.log("Error while deleting comment")
        res.status(500).json({message: err.message})
    }
}

// delete all Comments
const deleteAllComments = async (req, res) => {
    try{
        const result = await Comment.deleteMany()
        res.status(200).json({message: "Comments deleted successfully!", result})
    }
    catch(err){
        console.log("Error while deleting comments")
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    getCommentByResourceId,
    getCommentByUserId,
    getCommentByUserIdAndResourceId,
    updateComment,
    deleteComment,
    deleteAllComments
}
        