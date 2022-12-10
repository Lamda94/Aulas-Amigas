const Ajv = require("ajv")
const Response = require("../Network/index")
const {estudiante} = require("../Class/Estudiantes.class") 
const {curso_estudiante} = require("../Class/CursoEstudiante") 
const {curso} = require("../Class/Curso.class")
const {schema} = require("../schema/estudiantes.schema")
const ce = require('../schema/curso.estudiante.schema')

const ajv = new Ajv()

exports.NewEstudiante = async (req, res)=>{
    schema.required = ["id", "nombre", "apellido", "grado", "grupo", "correo", "ubicacion", "estado"]
    req.body.estado = 1
    const validate = ajv.validate(schema, req.body)
    if (validate) {
        const response = await estudiante.create(req.body)
        if (!response.error) {
            return Response.success(req, res, response.data, 200)
        }
        return Response.error(req, res, response.data, 500)
    }
    return Response.error(req, res, {msj: "Datos invalidos"}, 400)
}

exports.GetEstudiantes = async (req, res)=>{
    const Estudiantes = await estudiante.getAll()
    if (!Estudiantes.error) {
        return Response.success(req, res, Estudiantes.data, 200)
    }
    return Response.error(req, res, Estudiantes.data, 500)
}

exports.GetEstudiante = async (req, res)=>{
    const id = parseInt(req.params.id)
    if (id) {
        const Estudiante = await estudiante.get(id)
        if (!Estudiante.error) {
            return Response.success(req, res, Estudiante.data, 200)
        }
        return Response.error(req, res, Estudiante.data, 500)
    }
}

exports.AddCurso = async (req, res)=>{
    try {
        ce.schema.required = ["curso_id", "estudiante_id"]
        const validate = ajv.validate(ce.schema, req.body)
        if (validate) {
            const validateEstu = await estudiante.exist(req.body.estudiante_id)
            const validateCurso = await curso.exist(req.body.curso_id)
            if (validateEstu && validateCurso) {
                const response = await curso_estudiante.add(req.body)
                if (!response.error) {
                    return Response.success(req, res, response.data, 200)
                }
                return Response.error(req, res, response.data, 500)   
            }
            const msj = validateEstu == true ? "Curso no encontrado" : "Estudiante no encontrado"
            return Response.error(req, res, {msj}, 404)
        }
        return Response.error(req, res, {msj: "Datos invalidos"}, 400)
    } catch (error) {
        return Response.error(req, res, error, 500)
    }
}

exports.DeleteCurso = async (req, res)=>{
    try {
        ce.schema.required = ["curso_id", "estudiante_id"]
        const validate = ajv.validate(ce.schema, req.body)
        if (validate) {
            const {
                curso_id,
                estudiante_id
            } = req.body
            const validateEstu = await estudiante.exist(req.body.estudiante_id)
            const validateCurso = await curso.exist(req.body.curso_id)
            if (validateEstu && validateCurso) {
                const response = await curso_estudiante.putOff(estudiante_id, curso_id)
                if (!response.error) {
                    return Response.success(req, res, response.data, 200)
                }
                return Response.error(req, res, response.data, 500) 
            }  
            const msj = validateEstu == true ? "Curso no encontrado" : "Estudiante no encontrado"
            return Response.error(req, res, {msj}, 404)                     
        } 
        return Response.error(req, res, {msj: "Datos invalidos"}, 400)
    } catch (error) {
        return Response.error(req, res, error, 500)
    }
}

exports.DeleteEstudiante = async (req, res)=>{
    try {
        const id = req.params.id
        const response = await estudiante.delete(id)
        if (!response.error) {
            return Response.success(req, res, response.data, 200)            
        }
        return Response.error(req, res, response.data, response.code)
    } catch (error) {
        return Response.error(req, res, {msj:error.message}, 500)
    }
}

