const Resource = require('../models/Resource.js');
const User = require('../models/User.js');

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

        const userId = req.user.id 
        // add the id of the user who contributed this resource
        req.body.uploaded_by = userId
        const resource = new Resource(req.body)
        await resource.save()

        // add the id of this resource to the contributed resources of the user
        const user = await User.findById(userId)
        user.contributedResources.push(resource._id)
        await user.save()

        res.status(200).json({message : "Resource added successfully!"  ,resource,user})
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
        let k = parseInt(req.params.k)
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

// filter the courses based on the course code, year, tags, semester
// It is possible that some of the filters are not given like course code may not be given or an empty string or course code and year are given and not tags and semester
// Basically, any permutation of the filters is possible
// So, we have to handle all the cases

const filterResources = async (req, res) => {
    try {

        console.log("REQ", req.query)
        const courseCode = req.query.courseCode
        const year = req.query.year
        const tags = req.query.tags
        const semester = req.query.semester
        const courseTitle = req.query.courseTitle
        // handle all the cases
        // for tags, if all the tags given are present in the resource, then only return that resource. Resource may have more tags than the given tags
        // tags is an array


        let resources = await Resource.find()

        if(courseCode){
            resources = resources.filter(resource => resource.courseCode === courseCode)
        }

        if(year){
            resources = resources.filter(resource => resource.year === year)
        }

        if(semester){
            resources = resources.filter(resource => resource.semester === semester)
        }

        if(courseTitle){
            resources = resources.filter(resource => resource.courseTitle === courseTitle)
        }

        if(tags){
            resources = resources.filter(resource => {
                let flag = true
                for(let i = 0; i < tags.length; i++){
                    if(!resource.tags.includes(tags[i])){
                        flag = false
                        break
                    }
                }
                return flag
            })
        }

        // in the result resources, in the uploaded_by field, we have the id of the user who contributed the resource but replace id with name of the user
        // write code

        console.log(resources)

        res.status(200).json({message : "Resources fetched successfully!"  ,resources})

    }
    catch(err){
        console.log("Error in filtering resources!")
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
    getResourcesForCourseCode,
    filterResources
}
