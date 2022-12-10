const Ajv = require("ajv")
const Response = require("../Network/index")
const {curso} = require("../Class/Curso.class") 
const {schema} = require("../schema/curso.schema")

const ajv = new Ajv()

exports.NewCurso = async (req, res)=>{
    schema.required = ["nombre", "creditos"]
    const validate = ajv.validate(schema, req.body)
    if (validate) {
        const response = await curso.create(req.body)
        if (!response.error) {
            return Response.success(req, res, response.data, 200)
        }
        return Response.error(req, res, response.data, 500)
    }
    return Response.error(req, res, {msj: "Datos invalidos"}, 400)
}

exports.GetCursos = async (req, res)=>{
    const Cursos = await curso.getAll()
    if (!Cursos.error) {
        return Response.success(req, res, Cursos.data, 200)
    }
    return Response.error(req, res, Cursos.data, 500)
}

exports.GetCurso = async (req, res)=>{
    const id = parseInt(req.params.id)
    if (id) {
        const Curso = await curso.get(id)
        if (!Curso.error) {
            return Response.success(req, res, Curso.data, 200)
        }
        return Response.error(req, res, Curso.data, 500)
    }
    return Response.error(req, res, {msj: "Datos invalidos"}, 400)
}

exports.DeleteCurso = async (req, res)=>{
    try {
        const id = parseInt(req.params.id)
        if (id) {
            const Curso = await curso.delete(id)
            if (!Curso.error) {
                return Response.success(req, res, Curso.data, 200)
            }
            return Response.error(req, res, Curso.data, Curso.code)
        }
        return Response.error(req, res, {msj: "Datos invalidos"}, 400)    
    } catch (error) {
        console.log(error.message);
        return Response.error(req, res, error, 500)    
    }    
}

