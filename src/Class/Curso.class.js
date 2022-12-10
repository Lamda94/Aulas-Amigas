const Sequelize = require('../config/index')
const DataTypes = require("sequelize/lib/data-types")
const CursoModel = require('../models/cursos')(Sequelize, DataTypes)
const CursEstModel = require("../models/curso_estudiante")(Sequelize, DataTypes)

class Curso {
    constructor(curso, CurEst){
        this.cursoM = curso
        this.CursEstM = CurEst
    }

    async create(data){
        try {
            const CursoDB = await this.cursoM.create(data) || { msj:"Error registrando el curso" }
            return {
                error: false,
                data: CursoDB
            }
        } catch (error) {
            console.log(error.message);
            return {
                error: true,
                data: error.message
            }
        }
    }

    async get(id){
        try {
            const CursoDB = await this.cursoM.findOne({where:{id}}) || {msj: "Curso no encontrado"}
            return {
                error: false,
                data: CursoDB
            }   
        } catch (error) {
            return {
                error:true,
                data: error.message
            }    
        }        
    }

    async getAll(){
        try {
            const CursoDB = await this.cursoM.findAll()
            return {
                error: false,
                data: CursoDB
            }   
        } catch (error) {
            console.log(error.message)
            return {
                error:true,
                msj: error.message
            }    
        }
    }

    async update(id, data){
        try {
            const CursoDB = await this.cursoM.findOne({where:{id}}) || {}
            
            if (Object.keys(CursoDB).length > 0) {
                await CursoDB.update(data)
                const saved = await CursoDB.save()
                return {
                    error:false,
                    data: saved
                }
            }

            return{
                error:false,
                data: CursoDB.msj = "Usuario no encontrado"
            }   
        } catch (error) {
            return {
                error: true,
                data: error.message
            }
        }
    }

    async delete(id){
        const cursoDB = await this.cursoM.findOne({where:{id}}) || {}
        if (Object.keys(cursoDB).length>0) {
            await cursoDB.destroy()
            const CursEst = await this.CursEstM.findAll({where:{curso_id:id}}) || {}
            if (CursEst.length>0) {
                 await Promise.all(CursEst.map(async item=>{
                    await item.destroy()
                 }))

                 return {
                    error: false,
                    data: cursoDB
                 }   
            }
            return {
                error: false,
                data: cursoDB
            }
        }
        cursoDB.msj="Curso no encontrado"
        return {
            error: true,
            data: cursoDB,
            code: 404
        }
    }

    async exist(id){
        try {
            const CursoDB = await this.cursoM.findOne({where:{id}}) || false
            return CursoDB == false ? false : true
        } catch (error) {
            return {
                error:true,
                data: error.message
            }    
        }
    }

}

exports.curso = new Curso(CursoModel, CursEstModel)
