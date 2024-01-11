const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {dbConnect} = require('./config/db.js')
const userRouter = require('./routes/user.js')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())


app.get('/',(req,res) => {
    res.send('HomePage')
})

app.use('/api/v1/user',userRouter)


PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    try {
        await dbConnect
        console.log("Connected to DB!")
    }
    catch(error) {
        console.log("Error in connecting to DB!")
        console.log(error)
    }
    console.log(`Server is running on port ${PORT}`)
})

