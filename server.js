const express = require("express")
const EstacionamientoRouter = require("./routes/Registro")
const DueñoRouter = require("./routes/Conductor")
const cors= require("cors")
class server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths ={
            Estacionamiento:"/api/v1/Registro",
            Dueño:"/api/v1/Conductor"
        }
        this.middleware()
        this.routes()
    }
    routes(){
        // thsi.app.get("/",(req,res))

        this.app.use(this.paths.Estacionamiento ,EstacionamientoRouter)
        this.app.use(this.paths.Dueño ,DueñoRouter)
    }
    middleware(){
        this.app.use(cors())
        this.app.use(express.json())
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puertoo 4000")
        })
    }
}

module.exports = server