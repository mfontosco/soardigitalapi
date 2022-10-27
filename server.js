import express from "express"
import cors from "cors"
import morgan from "morgan"
import { Sequelize } from "sequelize"
import sequelizeConnection  from "./src/database/connection.js"
import UserRoutes from './routes/userRoute.js'
import PostRoutes from './routes/PostRoutes.js'
import LikesRoute from "./routes/LikesRoute.js"
import bodyParser from "body-parser"


const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/v1/users",UserRoutes)
app.use("/api/v1/post",PostRoutes)
app.use("/api/v1/like",LikesRoute)

sequelizeConnection.authenticate().then(()=> {
    console.log('Connected')
}).catch((err)=>{g
    console.log(err)
})



const port = 5000 || process.env.PORT
app.listen(port, (err)=>{
    if(err){
        throw err
    }
    console.log('server connected')
})