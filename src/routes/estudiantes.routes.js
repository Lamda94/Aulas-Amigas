const express = require("express");
const EstudianteController = require("../controllers/Estudiantes.controller");

const router = express.Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          estudiantes:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Identificacion de estudiante
 *                  nombre:
 *                      type: string
 *                      description: Nombre del estudiante
 *                  apellido:
 *                      type: string
 *                      description: Apellido del estudiante
 *                  grado:
 *                      type: integer
 *                      description: Grado al que pertenece el estudiante
 *                  grupo:
 *                      type: string
 *                      description: Grupo al que pertenece el estudiante
 *                  correo:
 *                      type: string
 *                      description: Correo del estudiante
 *                  ubicacion:
 *                      type: string
 *                      description: Ubicacion del estudiante
 *              required: 
 *                  - id
 *                  - nombre
 *                  - apellido
 *                  - grado
 *                  - grupo
 *                  - correo
 *                  - ubicacion
 *              example:
 *                  id: 123456789
 *                  nombre: Jose
 *                  apellido: Gomez
 *                  grado: 5
 *                  grupo: A
 *                  correo: correo@correo.com
 *                  ubicacion: ubicacion
 *          curso_estudiante:
 *              type: object
 *              properties:
 *                  curso_id:
 *                      type: integer
 *                      description: Id del curso
 *                  estudiante_id:
 *                      type: integer
 *                      description: Id del estudiante
 *              required: 
 *                  - curso_id
 *                  - estudiante_id
 *              example:
 *                  curso_id: 1
 *                  estudiante_id: 1 
 */


/**
 * @swagger
 * /api/estudiantes/:
 *  post:
 *      summary: Crear un nuevo estudiante
 *      tags: [Estudiantes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/estudiantes'
 *      responses:
 *          200:
 *              description: Usuario creado
 */
router.post("/", EstudianteController.NewEstudiante)

/**
 * @swagger
 * /api/estudiantes/add/curso:
 *  post:
 *      summary: Agrega un curso al estudiante
 *      tags: [Estudiantes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/curso_estudiante'
 *      responses:
 *          200:
 *              description: Curso agregado
 */
router.post("/add/curso", EstudianteController.AddCurso)

/**
 * @swagger
 * /api/estudiantes/delete/curso:
 *  post:
 *      summary: Quita un curso al estudiante
 *      tags: [Estudiantes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/curso_estudiante'
 *      responses:
 *          200:
 *              description: Curso quitado
 */
router.post("/delete/curso", EstudianteController.DeleteCurso)

/**
 * @swagger
 * /api/estudiantes/:
 *  get:
 *      summary: Muestra todos los estudiantes
 *      tags: [Estudiantes]
 *      responses:
 *       200:
 *          description: Devuelve todos los estudiantes
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/estudiantes'
 */
router.get("/", EstudianteController.GetEstudiantes)

/**
 * @swagger
 * /api/estudiantes/{id}:
 *  get:
 *      summary: Muestra un estudiantes
 *      tags: [Estudiantes]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: string
 *            required: true
 *      responses:
 *       200:
 *          description: Devuelve todos los estudiantes
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/estudiantes'
 */
router.get("/:id", EstudianteController.GetEstudiante)

/**
 * @swagger
 * /api/estudiantes/{id}:
 *  delete:
 *      summary: Elimina un estudiantes
 *      tags: [Estudiantes]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: string
 *            required: true
 *      responses:
 *       200:
 *          description: Devuelve los datos del estudiantes eliminado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/estudiantes'
 */
router.delete("/:id", EstudianteController.DeleteEstudiante)

module.exports = router