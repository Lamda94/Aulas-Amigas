const Sequelize = require('../config/index')
const DataTypes = require("sequelize/lib/data-types")
const EstudianteModel = require("../models/estudiantes")(Sequelize, DataTypes)
const CursoModel = require('../models/cursos')(Sequelize, DataTypes)
const CursoEstuModel = require('../models/curso_estudiante')(Sequelize, DataTypes)
class Estudiante {
    constructor(e, c, ce){
        this.Estudiante = e
        this.Curso = c
        this.CursoEst = ce
    }

    async create(data){
        try {
            const newEstudent = await this.Estudiante.create(data) || { msj:"Error registrando el estudiante" }
            return {
                error: false,
                data: newEstudent
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
            this.Curso.belongsToMany(this.Estudiante, {through:this.CursoEst, foreignKey: "curso_id"});
            this.Estudiante.belongsToMany(this.Curso, {through:this.CursoEst, foreignKey: "estudiante_id"});
            const EstudianteDB = await this.Estudiante.findOne({
                where:{id},
                attributes:["id", "nombre", "apellido", "grado", "grupo", "correo", "ubicacion", "estado"],
                include:[{
                    model:this.Curso,
                    attributes:["id", "nombre", "creditos"]
                }]
            }) || {msj: "Usuario no encontrado"}
            return {
                error: false,
                data: EstudianteDB
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
            this.Curso.belongsToMany(this.Estudiante, {through:this.CursoEst, foreignKey: "curso_id"});
            this.Estudiante.belongsToMany(this.Curso, {through:this.CursoEst, foreignKey: "estudiante_id"});
            
            const EstudianteDB = await this.Estudiante.findAll({
                attributes:["id", "nombre", "apellido", "grado", "grupo", "correo", "ubicacion", "estado"],
                include:[{
                    model:this.Curso,
                    attributes:["id", "nombre", "creditos"]
                }]
            })
            
            return {
                error: false,
                data: EstudianteDB
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
            const estudianteDB = await this.Estudiante.findOne({where:{id}}) || {}
            
            if (Object.keys(estudianteDB).length > 0) {
                await estudianteDB.update(data)
                const saved = await estudianteDB.save()
                return {
                    error:false,
                    data: saved
                }
            }

            return{
                error:false,
                data: estudianteDB.msj = "Usuario no encontrado"
            }   
        } catch (error) {
            return {
                error: true,
                data: error.message
            }
        }
    }

    async delete(id){
        const estudianteDB = await this.Estudiante.findOne({where:{id}}) || {}
        if (Object.keys(estudianteDB).length>0) {
            await estudianteDB.destroy()
            const CursEst = await this.CursoEst.findAll({where:{estudiante_id:id}}) || {}
            if (CursEst.length>0) {
                 await Promise.all(CursEst.map(async item =>{
                    await item.destroy()
                 }))

                 return {
                    error: false,
                    data: estudianteDB
                 }   
            }
            return {
                error: false,
                data: estudianteDB
             }
        }
        estudianteDB.msj="Estudiante no encontrado"
        return {
            error: true,
            data: estudianteDB,
            code: 404
        }
    }

    async exist(id){
        try {
            const EstudianteDB = await this.Estudiante.findOne({where:{id}}) || false
            return  EstudianteDB == false ? false : true
        } catch (error) {
            return {
                error:true,
                data: error.message
            }    
        }
    }

}

exports.estudiante = new Estudiante(EstudianteModel, CursoModel, CursoEstuModel)