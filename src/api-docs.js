const path = require('path');
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express')

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            version:"1.0.0",
            title:"Prueba Tecnica Aulas Amigas",
        },
        servers:[{url:"http://localhost:4000"}]
    },
    apis:[`${path.join(__dirname, "/routes/*.js")}`]
}

const swaggerSpec = swaggerJsDoc(options)

const swaggerDoc = (app, port)=>{
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get("/api/v1/docs.json", (req, res)=>{
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })
    console.log(`Documentacion disponible en http://localhost:${port}/api/v1/docs`);
}

module.exports = {swaggerDoc}
