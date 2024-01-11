const Resource = require('../models/Resource.js');

const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find()
        res.status(200).json({message : "Resources fetched successfully!"  ,resources})
    }
    catch(err) {
        console.log("Error in getting all resources!")
        res.status(500).json({message : err.message})
    }
}

const getResourceById = async (req, res) => {
    try {
        const id = req.params.id
        const resource = await Resource.findById(id)
        res.status(200).json({message : "Resource fetched successfully!"  ,resource})
    }
    catch(err) {
        console.log("Error in getting resource by id!")
        res.status(500).json({message : err.message})
    }
}

const addResource = async (req, res) => {
    try {
        const resource = new Resource(req.body)
        await resource.save()
        res.status(200).json({message : "Resource added successfully!"  ,resource})
    }
    catch(err) {
        console.log("Error in adding resource!")
        res.status(500).json({message : err.message})
    }
}

const updateResource = async (req, res) => {
    try {
        const id = req.params.id
        
        const isExist = await Resource.findById(id)

        if(!isExist)
            return res.status(404).json({message : "Resource not found!"})

        const resource = await Resource.findByIdAndUpdate(id , req.body)
        res.status(200).json({message : "Resource updated successfully!"  ,resource})
    }
    catch(err) {
        console.log("Error in updating resource!")
        res.status(500).json({message : err.message})
    }
}


const deleteResource = async (req, res) => {
    try {
        const id = req.params.id
        
        const isExist = await Resource.findById(id)
        if(!isExist)
            return res.status(404).json({message : "Resource not found!"})

        const resource = await Resource.findByIdAndDelete(id)
        res.status(200).json({message : "Resource deleted successfully!"  ,resource})
    }
    catch(err) {
        console.log("Error in deleting resource!")
        res.status(500).json({message : err.message})
    }
}

const deleteAllResources = async (req, res) => {
    try {
        const resources = await Resource.deleteMany()
        res.status(200).json({message : "All resources deleted successfully!"  ,resources})
    }
    catch(err) {
        console.log("Error in deleting all resources!")
        res.status(500).json({message : err.message})
    }
}

// find top k resource with most likes
const getTopKResourcesForLikes = async (req, res) => {
    try {
        const k = parseInt(req.params.k)
        const totalResources = await Resource.countDocuments()
        k = Math.min(k, totalResources)
        const resources = await Resource.find().sort({likes : -1}).limit(k)
        res.status(200).json({message : "Top k resources fetched successfully!"  ,resources})
    }
    catch(err) {
        console.log("Error in getting top k resources!")
        res.status(500).json({message : err.message})
    }
}

// return resources for a particular year
const getResourcesForYear = async (req, res) => {
    try {
        const year = parseInt(req.params.year)
        const resources = await Resource.find({year})
        res.status(200).json({message : "Resources fetched successfully!"  ,resources})
    }
    catch(err) {
        console.log("Error in getting resources for a particular year!")
        res.status(500).json({message : err.message})
    }
}

// return resources for course code
const getResourcesForCourseCode = async (req, res) => {
    try {
        const courseCode = req.params.courseCode
        const resources = await Resource.find({courseCode})
        res.status(200).json({message : "Resources fetched successfully!"  ,resources})
    }
    catch(err) {
        console.log("Error in getting resources for a particular course code!")
        res.status(500).json({message : err.message})
    }
}

module.exports = {
    getAllResources,
    getResourceById,
    addResource,
    updateResource,
    deleteResource,
    deleteAllResources,
    getTopKResourcesForLikes,
    getResourcesForYear,
    getResourcesForCourseCode
}