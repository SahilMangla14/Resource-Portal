const User = require('../models/User.js')
const Resource = require('../models/Resource.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const {name,email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exists"})
        }

        const newUser = new User(req.body)
        await newUser.save()

        const data = await User.findOne({email})
        return res.status(201).json({message: "User registered successfully", data})
    }
    catch (err){
        console.log("Error while registering user")
        res.status(500).json({message: err.message})
    }
}


const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            console.log("Email or password is missing")
            return res.status(400).json({message: "Email or password is missing"})
        }
        const user = await User.findOne({email})
        if(!user){
            console.log("User not found")
            return res.status(404).json({message: "User not found"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            console.log("Password is incorrect")
            return res.status(401).json({message: "Password is incorrect"})
        }
        const id = user._id
        const token = jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.cookie('_auth_resource_tkn', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
            path: '/',
        });
        res.status(200).json({message: "User logged in successfully", token})
    }
    catch (err){
        console.log("Error while logging in user")
        res.status(500).json({message: "Error while logging in user"})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({message: "All users fetched successfully", users})
    }
    catch (err){
        console.log("Error while getting all users")
        res.status(500).json({message: err.message})
    }
}

const getUserById = async (req, res) => {
    try{
        const id = req.user.id
        const user = await User.findById(id)

        if(!user){
            console.log("User not found")
            res.status(404).json({message: "User not found"})
        }
        res.status(200).json({message: "User fetched successfully", user})
    }
    catch (err){
        console.log("Error while getting user by id")
        res.status(500).json({message: err.message})
    }
}


const updateUser = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)

        if(!user){
            console.log("User not found")
            res.status(404).json({message: "User not found"})
        }

        // check if req.body contains password and if contains password then hash it
        if(req.body.password){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }

        const newUser = {...user._doc, ...req.body}

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
        // console.log(updatedUser)
        res.status(200).json({message: "User updated successfully", updatedUser})
    }
    catch(err){
        console.log("Error while updating user")
        res.status(500).json({message: err.message})
    }
}


const deleteUser = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)

        if(!user){
            console.log("User not found")
            res.status(404).json({message: "User not found"})
        }

        const deletedUser = await User.findByIdAndDelete(id)
        res.status(200).json({message: "User deleted successfully", deletedUser})
    }
    catch (err){
        console.log("Error while deleting user")
        res.status(500).json({message: err.message})
    }
}


// return the min(5,number of users) sorted by length of contributedResources array
const topContributors = async (req, res) => {
    try {
        // const topContributors = await User.find().sort({contributedResources: -1}).limit(5)

        const users = await User.find();
        
        // Sort users based on the length of contributedResources array
        const sortedUsers = users.sort((a, b) => b.contributedResources.length - a.contributedResources.length);
        
        // Take the top 5 contributors
        const topContributors = sortedUsers.slice(0, 5);
        
        // console.log(topContributors)

        const contributorsWithContributions = topContributors.map(user => ({
            ...user._doc,
            contributions: user.contributedResources.length,
        }));

        res.status(200).json({message: "Top contributors fetched successfully", topContributors: contributorsWithContributions})
    }
    catch (err){
        console.log("Error while getting top contributors")
        res.status(500).json({message: err.message})
    }
}

// check wheter the given course is present in savedResources or not
// savedResources is an array of resource ids
// if present the set isBookmarked to true else false
const isBookmarked = async (req, res) => {
    const resourceId = req.params.id
    const userId = req.user.id
    try {
        const user = await User.findById(userId)
        if(!user){
            console.log("User not found")
            res.status(404).json({message: "User not found"})
        }
        const isBookmarked = user.savedResources.includes(resourceId)
        res.status(200).json({message: "Is bookmarked fetched successfully", isBookmarked})
    }
    catch (err){
        console.log("Error while getting is bookmarked")
        res.status(500).json({message: err.message})
    }
}


// save the given course in savedResources array
// savedResources is an array of resource ids
const saveResource = async (req, res) => {
    const resourceId = req.params.id
    const userId = req.user.id
    try {
        const user = await User.findById(userId)
        if(!user){
            console.log("User not found")
            res.status(404).json({message: "User not found"})
        }
        const savedResources = user.savedResources
        // if not present then push it
        if(!savedResources.includes(resourceId)){
            savedResources.push(resourceId)
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {savedResources}, {new: true})
        res.status(200).json({message: "Resource saved successfully", updatedUser})
    }
    catch (err){
        console.log("Error while saving resource")
        res.status(500).json({message: err.message})
    }
}

// remove from save resource
// check if the resource exists in savedResources array
// if exists then remove it
const removeSavedResource = async (req, res) => {
    const resourceId = req.params.id
    const userId = req.user.id
    try {
        const user = await User.findById(userId)
        if(!user){
            console.log("User not found")
            res.status(404).json({message: "User not found"})
        }
        const savedResources = user.savedResources
        const index = savedResources.indexOf(resourceId)
        if(index > -1){
            savedResources.splice(index, 1)
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {savedResources}, {new: true})
        res.status(200).json({message: "Resource removed successfully", updatedUser})
    }
    catch (err){
        console.log("Error while removing resource")
        res.status(500).json({message: err.message})
    }
}

const logoutUser = async (req, res) => {
    try{
        res.clearCookie('_auth_resource_tkn');
        res.status(200).json({message: "User logged out successfully"})
    }
    catch (err){    
        console.log("Error while logging out user")
        res.status(500).json({message: err.message})
    }
}

// get saved resources
const getSavedResources = async (req, res) => {
    const userId = req.user.id 
    try {
        const user = await User.findById(userId)
        if(!user){
            console.log("User not found")
            res.status(404).json({message: "User not found"})
        }
        const savedResources = user.savedResources
        // console.log("Saved Resources ", savedResources)
        // get all the saved resources
        const savedResourcesData = await Resource.find({_id: {$in: user.savedResources}})
        // console.log("Saved Resourcd Data ", savedResourcesData)

        const updatedResourceData= await Promise.all(
            savedResourcesData.map(async (resource) => {
                const uploadedUser = await User.findById(resource.uploaded_by);
                return {
                    ...resource._doc,
                    uploadedBy: uploadedUser ? uploadedUser.name : "Unknown",
                };
            })
        );

        // console.log("Saved Resources Data ", resourceDataWithUploadedBy)
        res.status(200).json({message: "Saved resources fetched successfully", updatedResourceData})
    }
    catch (err){
        console.log("Error while getting saved resources")
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    topContributors,
    isBookmarked,
    saveResource,
    removeSavedResource,
    getSavedResources,
    logoutUser
}