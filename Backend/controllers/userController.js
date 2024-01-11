const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
    const {email,password} = req.body
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
    const {email,password} = req.body

    if(!email || !password){
        console.log("Email or password is missing")
        res.status(400).json({message: "Email or password is missing"})
    }

    const user = await User.findOne({email})

    if(!user){
        console.log("User not found")
        res.status(404).json({message: "User not found"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        console.log("Password is incorrect")
        res.status(401).json({message: "Password is incorrect"})
    }

    const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.status(200).json({message: "User logged in successfully", token})
}