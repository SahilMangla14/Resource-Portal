const Resource = require('../models/Resource.js');
const Comment = require('../models/Comment.js');
const User = require('../models/User.js');

const getAllResources = async (req, res) => {
    try {
        const userId = req.user.id 
        const resources = await Resource.find().populate('uploaded_by')
        res.status(200).json({message : "Resources fetched successfully!"  ,resources,userId})
    }
    catch(err) {
        console.log("Error in getting all resources!")
        res.status(500).json({message : err.message})
    }
}

const getResourceById = async (req, res) => {
    try {
        const id = req.params.id
        const resource = await Resource.findById(id).populate('uploaded_by')
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
        let id = req.params.id
        
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

const LikeResource = async (req, res) => {
    try {
        let id = req.params.id
        const resource = await Resource.findById(id)
        if(!resource)
            return res.status(404).json({message : "Resource not found!"})

        const userId = req.user.id
        const userIndex = resource.peopleWhoLiked.indexOf(userId)
        if(userIndex!==-1){
            resource.peopleWhoLiked.splice(userIndex, 1)
        }
        else{
            const userDislikeIndex = resource.peopleWhoDisliked.indexOf(userId)
            if (userDislikeIndex !== -1) {
                resource.peopleWhoDisliked.splice(userDislikeIndex, 1)
            }
            else{
                resource.peopleWhoLiked.push(userId)
            }     
            resource.likes++
            
            const data = await resource.save()
            
            res.status(200).json({message : "Resource updated successfully!"  ,resource})
        }
    }
    catch(err) {
        console.log("Error in liking resource!")
        res.status(500).json({message :"Error in liking resource!"})
    }
}

const DislikeResource = async (req, res) => {
    try {
        console.log("Disliking resource")
        let id = req.params.id
        const resource = await Resource.findById(id)
        if(!resource)
            return res.status(404).json({message : "Resource not found!"})

        const userId = req.user.id
        const userIndex = resource.peopleWhoDisliked.indexOf(userId)
        if(userIndex!==-1){
            resource.peopleWhoDisliked.splice(userIndex, 1)
        }
        else{
            const userLikeIndex = resource.peopleWhoLiked.indexOf(userId)
            if (userLikeIndex !== -1) {
                resource.peopleWhoLiked.splice(userLikeIndex, 1)
            }
            else{
                resource.peopleWhoDisliked.push(userId)
            }     
            resource.likes--
            
            const data = await resource.save()
            
            res.status(200).json({message : "Resource updated successfully!"  ,resource})
        }
    }
    catch(err) {
        console.log("Error in disliking resource!")
        res.status(500).json({message :"Error in disliking resource!"})
    }
}

const deleteResource = async (req, res) => {
    try {
        const id = req.params.id
        
        const isExist = await Resource.findById(id)
        if(!isExist)
            return res.status(404).json({message : "Resource not found!"})

        const resource = await Resource.findByIdAndDelete(id)
        // const users = await User.find({ contributedResources: id });

        // find users where this resouce id is present in contributed resources array
        const users = await User.find({contributedResources : { $in : [id]}})

        // update the contributedResources array for each user
        users.forEach(async (user) => {
            const index = user.contributedResources.indexOf(id);
            if (index !== -1) {
                user.contributedResources.splice(index, 1); // Remove the resourceId from contributedResources array
                await user.save(); // Save the user to update the database
            }
        });


        // find users where this resouce id is present in saved resources array
        const users2 = await User.find({savedResources : { $in : [id]}})

        // update the savedResources array for each user
        users2.forEach(async (user) => {
            const index = user.savedResources.indexOf(id);
            if (index !== -1) {
                user.savedResources.splice(index, 1); // Remove the resourceId from savedResources array
                await user.save(); // Save the user to update the database
            }
        });


        // delete the comments of this resource
        await Comment.deleteMany({resourceId : id})

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

        // make the contributed array empty for all the users
        const users = await User.find()
        users.forEach(async (user) => {
            user.contributedResources = []
            user.savedResources = []
            await user.save()
        })

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
        const userId = req.user.id 
        let k = parseInt(req.params.k)
        const totalResources = await Resource.countDocuments()
        k = Math.min(k, totalResources)
        const resources = await Resource.find().sort({likes : -1}).limit(k).populate("uploaded_by")
        res.status(200).json({message : "Top k resources fetched successfully!"  ,resources,userId})
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

const getResourcesForUser = async (req, res) => {
    try {
        const uploaded_by=req.user.id
        const resources = await Resource.find({uploaded_by})
        res.status(200).json({message : "Resources fetched successfully!"  ,resources})
    }
    catch(err) {
        console.log("Error in getting resources for this user!")
        res.status(500).json({message : err.message})
    }
}

// filter the courses based on the course code, year, tags, semester
// It is possible that some of the filters are not given like course code may not be given or an empty string or course code and year are given and not tags and semester
// Basically, any permutation of the filters is possible
// So, we have to handle all the cases

const filterResources = async (req, res) => {
    try {

        // console.log("REQ", req.query)
        const courseCode = req.query.courseCode
        const year = req.query.year
        const tags = req.query.tags
        const semester = req.query.semester
        const courseTitle = req.query.courseTitle
        const instructor = req.query.instructor
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

        if(instructor){
            // either instrcutor_primary or instructor_secondary should be equal to instructor
            resources = resources.filter(resource => resource.instructor_primary === instructor || resource.instructor_secondary === instructor)
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


        console.log("************************************************",resources)

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
    getResourcesForUser,
    filterResources,
    LikeResource,
    DislikeResource
}
