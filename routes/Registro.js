const{Router} = require("express")
const{getRegistro,getRegistroByID,deleteRegistroByID,addRegistro} = require( "../controllers/Registro")
const router = Router()

//http://localhost:4000/api/v1/Registro/id/ 

//Get//

router.get("/", getRegistro,)
router.get("/id/:id",getRegistroByID)

//pos//
router.post("/",addRegistro)

//put//
router.delete("/id/:id",deleteRegistroByID)

module.exports=router 