const { request, response }= require("express");
const pool = require("../db/connection");

const getConductor= async (req = request, res = response) => {
    let conn;
    
    try{
        conn = await pool.getConnection() //Realizamons la conexion

        //Generamos la consulta
        const Auto = await conn.query("SELECT * FROM dueño", (error) => {if (error) throw error})

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
    const getConductorByID = async ( req = request , res = response )=>{
        const {id} = req.params 
        let conn;
    
        try{
            conn =await pool.getConnection() //realisamos la conexion 
    
            //Generamos la consulta 
    
            const Auto  = await conn.query(`SELECT * FROM dueño WHERE ID = ?`,[id] , (error) => { if (error) throw error })
    
            console.log(Auto)
    
            if (!Auto){ 
                res.status(404).json({msg:`No existe Dueños  registrados con el ID ${id} ` })
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
    const deleteConductorByID = async ( req = request,res = response) =>{
        const {id} = req.params
        let conn;
    
        try{
            conn = await pool.getConnection() //Realizamos la conexion //
    
            const result = await conn.query(`UPDATE dueño SET Activo = "A" WHERE ID = ${id} ` , (error) => { if (error) throw error })
            if (result.affecterdRows == 0){ // encaso de no haber registyrado la informacion //
                res.status(400).json({msg:`No existe Dueños registrados con el ID ${id} ` })
                return
            }
            res.json({msg:`Se elimino satisfactoriamente el Dueño del auto  con ID ${id}`})
    
          
        }
        catch(error){
            console.log(error)
            res.status(500).json({msg:`Se elimino satisfatoriamente el Dueñeo del auto  con el `})
        }
    }
    
    const addConductor = async ( req =request , res = response)=>{
        const{Nombre,Apellido,Modelo,Marcas,Matricula,Color,Activo}= req.body
    
        if(
            !Nombre||
            !Apellido||
            !Modelo||
            !Marcas||
            !Matricula||
            !Color||
            !Activo )
            {
                res.status(400).json({msg:"Faltan datos del Dueño"})
                return
            }
            
    
            let conn;
            try{
                conn = await pool.getConnection()
                const [DueñoExist]=await conn.query(`SELECT Nombre FROM dueño WHERE Nombre = ',${Nombre}' `)
    
                if(DueñoExist){
                    res.status(400).json({msg:`El Dueño ${Nombre} Ya se encuentra Registrado`})
                    return
                }
    
    
    
                const result = await conn.query(`INSERT INTO dueño (Nombre,Apellido,Modelo,Marcas,Matricula,Color,Activo)VALUES (
                    '${Nombre}',
                    '${Apellido}',
                    '${Modelo}',
                    '${Marcas}',
                    '${Matricula}',
                    '${Color}',
                    '${Activo}')`,(error) => { if(error) throw error})
                    
    
                    if (result.affecterdRows === 0){
                        res.status(400).json({ msg:"EL Dueño no se pudo registrar correctamente "})
                        return
                    }
    
                    res.json({msg:`Se agrego satisfatoriamente el Dueño`})
            } catch (error){
                console.log(error)
                res.status(500).json({msg:error})
            } finally{
                if (conn) conn.end()
            }
    }
    
    module.exports = {getConductor,getConductorByID,deleteConductorByID,addConductor}