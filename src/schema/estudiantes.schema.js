exports.schema = {
  type: "object",
  properties:{
    id: {type: "integer"},
    nombre: {type: "string"},
    apellido: {type: "string"},
    grado: {type: "integer"},
    grupo: {type: "string"},
    correo: {type: "string"},
    ubicacion: {type: "string"},
    estado: {type: "integer"}
  },
  additionalProperties: false
}