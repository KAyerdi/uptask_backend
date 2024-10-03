import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExist } from '../middleware/project'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

/** Routes for Project */

router.post('/',
  body('projectName')
  .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),

  body('clientName')
  .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),

  body('description')
  .notEmpty().withMessage('La descripcion es Obligatoria'),

  handleInputErrors,
  
  ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.getProjectById
)

router.put("/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del Proyecto es Obligatorio"),

  body("clientName")
    .notEmpty()
    .withMessage("El nombre del Cliente es Obligatorio"),

  body("description").notEmpty().withMessage("La descripcion es Obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
)

router.delete('/:id',
  param('id').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ProjectController.deleteProject
)

/** Routes for task */
router.param('projectId', validateProjectExist)

router.post('/:projectId/tasks',
  body('name')
  .notEmpty().withMessage('El nombre de la tarea es Obligatorio'),
  body('description')
  .notEmpty().withMessage('La descripción de la tarea es Obligatorio'),
  handleInputErrors,
  TaskController.createTask
)

router.get('/:projectId/tasks',
  TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no válido'),
  body('name')
  .notEmpty().withMessage('El nombre de la tarea es Obligatorio'),
  body('description')
  .notEmpty().withMessage('La descripción de la tarea es Obligatorio'),
  handleInputErrors,
  TaskController.updateTask
)



export default router