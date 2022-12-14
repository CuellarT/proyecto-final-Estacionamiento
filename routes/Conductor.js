const{Router} = require("express")
const{getConductor,getConductorByID,deleteConductorByID,addConductor} = require( "../controllers/Conductor")
const router = Router()

//http://localhost:4000/api/v1/Registro/id/ 

//Get//

router.get("/", getConductor,)
router.get("/id/:id", getConductorByID,)

//pos//
router.post("/",addConductor)

//put//
router.delete("/id/:id",deleteConductorByID)

module.exports=router 