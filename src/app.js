const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require("dotenv").config()

const {swaggerDoc} = require('./api-docs');
//importacion de las rutas
const Estudiantes = require('./routes/estudiantes.routes')
const Cursos = require('./routes/cursos.routes')

const app = express()

//Configuracion del entorno
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('tiny'))

//Configuracion de los cors
app.use(cors())

//Configuracion de las rutas
app.use("/api/estudiantes", Estudiantes)
app.use("/api/cursos", Cursos)

const PORT  = process.env.PORT || 4000
//Configuracion del puerto de ejecuion del servidor
app.listen(PORT, ()=>{
    console.log(`App ejecutandoce en el puerto ${PORT}`)
    swaggerDoc(app, PORT)
})