import InfoRoutes from './InfoRouter';
import UserRoutes from './UserRouter'
import AuthRoutes from './AuthRouter'
import TaskRoutes from './TaskRouter';
import { Router } from 'express';

const routes = Router()

routes.use(InfoRoutes
    /* #swagger.tags = ['Info'] */
)
routes.use('/users', UserRoutes
    /* #swagger.tags = ['User'] */
    /* #swagger.responses[404] = {
        message: 'User with id 1 not found'
    } */
)
routes.use('/auth', AuthRoutes
    /* #swagger.tags = ['Auth'] */
)
routes.use('/tasks', TaskRoutes
    /* #swagger.tags = ['Task'] */
)

export default routes