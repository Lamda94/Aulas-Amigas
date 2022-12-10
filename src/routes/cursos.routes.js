const express = require("express");
const CursosController = require("../controllers/Curso.controller");

/**
 * @swagger
 *  components:
 *      schemas:
 *          cursos:
 *              type: object
 *              properties:
 *                  nombre:
 *                      type: string
 *                      description: Nombre del curso
 *                  creditos:
 *                      type: integer
 *                      description: Numero de creditos del curso
 *              required: 
 *                  - nombre
 *                  - creditos
 *              example:
 *                  nombre: Matematica
 *                  creditos: 4
 */

const router = express.Router();

/**
 * @swagger
 * /api/cursos/:
 *  get:
 *      summary: Mostrar todos los cursos
 *      tags: [Cursos]
 *      responses:
 *       200:
 *          description: Devuelve todos los usuarios
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/cursos'
 */
router.get("/", CursosController.GetCursos)

/**
 * @swagger
 * /api/cursos/{id}:
 *  get:
 *      summary: Muestra un curso
 *      tags: [Cursos]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: string
 *            required: true
 *      responses:
 *       200:
 *          description: Devuelve un curso
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/cursos'
 */
router.get("/:id", CursosController.GetCurso)

/**
 * @swagger
 * /api/cursos/:
 *  post:
 *      summary: Registra un nuevo curso
 *      tags: [Cursos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/cursos'
 *      responses:
 *          200:
 *              description: Curso creado
 */
router.post("/", CursosController.NewCurso)

/**
 * @swagger
 * /api/cursos/{id}:
 *  delete:
 *      summary: Elimina un curso
 *      tags: [Cursos]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: string
 *            required: true
 *      responses:
 *       200:
 *          description: Devuelve el curso que fue eliminado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/cursos'
 */
router.delete("/:id", CursosController.DeleteCurso)

module.exports = router