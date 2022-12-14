const { request, response }= require("express");
const pool = require("../db/connection");

const getRegistro= async (req = request, res = response) => {
    let conn;
    
    try{
        conn = await pool.getConnection() //Realizamons la conexion

        //Generamos la consulta
        const Auto = await conn.query("SELECT * FROM registro", (error) => {if (error) throw error})

        if (Auto.length===0){ //En caso de no haber registros lo informamos
            res.status(404).json({msg: "No existen registros"})
            return
        }

        res.json({Auto}) //Se manda la lista de usuarios
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: error}) //Informamos el error
    }
    
    finally{
        if(conn) conn.end() //Termina la conexion
    }
    
    }
    
    const getRegistroByID = async ( req = request , res = response )=>{
    const {id} = req.params 
    let conn;

    try{
        conn =await pool.getConnection() //realisamos la conexion 

        //Generamos la consulta 

        const Auto  = await conn.query(`SELECT * FROM registro WHERE ID = ?`,[id] , (error) => { if (error) throw error })

        console.log(Auto)

        if (!Auto){ 
            res.status(404).json({msg:`No existe autos registrados con el ID ${id} ` })
            return
        }

        res.json({Auto}) // se manda la lista de registro 
    } catch(error) {
        console.log(error)
        res.status(500).json({msg: error}) //Informamos el error
    }  finally{
        if (conn) conn.end() // Termina la conecion 
    }
}
const deleteRegistroByID = async ( req = request,res = response) =>{
    const {id} = req.params
    let conn;

    try{
        conn = await pool.getConnection() //Realizamos la conexion //

        const result = await conn.query(`UPDATE registro SET Activo = "A" WHERE ID = ${id} ` , (error) => { if (error) throw error })
        if (result.affecterdRows == 0){ // encaso de no haber registyrado la informacion //
            res.status(400).json({msg:`No existe Autos registrados con el ID ${id} ` })
            return
        }
        res.json({msg:`Se elimino satisfactoriamente el Auto con ID ${id}`})

      
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg:`Se elimino satisfatoriamente el Auto con el `})
    }
}

const addRegistro = async ( req =request , res = response)=>{
    const{Modelo,Marcas,Matricula,Color,Piso,Bloque,Activo}= req.body

    if(
        !Modelo||
        !Marcas||
        !Matricula||
        !Color||
        !Piso||
        !Bloque||
        !Activo )
        {
            res.status(400).json({msg:"Faltan datos del Auto"})
            return
        }
        

        let conn;
        try{
            conn = await pool.getConnection()
            const [AutoExist]=await conn.query(`SELECT Modelo FROM registro WHERE Modelo ="?"`,[Modelo])

            if(AutoExist){
                res.status(400).json({msg:`El Auto ${Modelo} Ya se encuentra Registrado`})
                return
            }



            const result = await conn.query(`INSERT INTO registro (Modelo,Marcas,Matricula,Color,Piso,Bloque,Activo)VALUES (
                '${Modelo}',
                '${Marcas}',
                '${Matricula}',
                '${Color}',
                '${Piso}',
                '${Bloque}',
                '${Activo}')`,(error) => { if(error) throw error})
                

                if (result.affecterdRows === 0){
                    res.status(400).json({ msg:"EL auto no se pudo registrar correctamente "})
                    return
                }

                res.json({msg:`Se agrego satisfatoriamente el auto `})
        } catch (error){
            console.log(error)
            res.status(500).json({msg:error})
        } finally{
            if (conn) conn.end()
        }
}

module.exports = {getRegistro,getRegistroByID,deleteRegistroByID,addRegistro}