const Sequelize = require('../config/index')
const DataTypes = require("sequelize/lib/data-types")
const CEModel = require("../models/curso_estudiante")(Sequelize, DataTypes)

class CursoEstudiante {
    constructor(ce){
        this.CE = ce
    }

    async add(data){
        try {
            const CursoAdd = await this.CE.create(data) || {msj:"Error agregando el curso"}
            return{
                error:false, 
                data: CursoAdd
            }   
        } catch (error) {
            return{
                error:true,
                data:{msj:error.message}
            }    
        }
    }

    async putOff(id_e, id_c){
        try {            
            const putOff = await this.CE.findOne({where:{curso_id: id_c, estudiante_id: id_e}}) || {}
            
            if (Object.keys(putOff).length>0) {
                console.log(putOff)
                await putOff.destroy()
                return {
                    error: false,
                    data:putOff
                }
            }

            return {
                error: false,
                data:putOff.msj = "Asignacion no encontrada"
            }   
        } catch (error) {
            return{
                error:true,
                data:{msj:error.message}
            }
        }
    }
}

exports.curso_estudiante = new CursoEstudiante(CEModel)