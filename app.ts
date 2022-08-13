import express from "express"
import connectDb from "./utils/connect"
import config from "config"
import log from "./utils/logger"
import routes from "./routes"
import deserializeUser from "./middleware/deserializeUser"

const app = express()

app.use(express.json())

app.use(deserializeUser)

const port = config.get<number>("port")

const start = async() => {
    try{
        await connectDb()
        app.listen(port, () => {
            log.info(`App is listening on port: ${port}`)
        })
    }catch(e:any){
        log.error(e)
    }
}

start()
routes(app)