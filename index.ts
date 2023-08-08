import express from 'express'
import dotenv from 'dotenv'
import {db} from './src/infra/database/config'
import userRouter from './src/interface/Routers/userRouter'
import ownerRouter from './src/interface/Routers/owerRouter'
import adminRouter from './src/interface/Routers/adminRoute'
import orgRouter from './src/interface/Routers/organizationRoute'
import stadiumRouter from './src/interface/Routers/StadiumRoute'
import stadiumFetchRouter from './src/interface/Routers/StadiumRoute'

const cors =require('cors')

const app = express()



db()
app.use(express.json())

app.use(cors({
    origin : ["http://localhost:5173"],
    methods : ["GET","POST"],
    credentials : true
}))


app.use('/',userRouter)
app.use('/owner',ownerRouter)
app.use('/admin',adminRouter)
app.use('/org',orgRouter)
app.use('/stadium',stadiumRouter )
const server = app.listen(3000,()=>{
    console.log("server running");
})





