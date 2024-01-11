const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {dbConnect} = require('./config/db.js')
const userRouter = require('./routes/user.js')
const resourceRouter = require('./routes/resource.js')
const notFound = require('./middleware/notFound.js')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())


app.get('/api',(req,res) => {
    res.send('HomePage')
})

app.use('/api/v1/user',userRouter)
app.use('/api/v1/resource',resourceRouter)
app.use(notFound)


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

