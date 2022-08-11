import {Express, Request, Response} from 'express'
import { createUserHandler } from './controller/user.controller'
import { validateResource } from './middleware/validateResource'
import { createUserSchema } from './schema/user.schema'

const routes = (app: Express) => {
    app.route('/healthcheck').get((req: Request, res: Response) => res.sendStatus(200))

    app.route("/api/v1/createuser").post(validateResource(createUserSchema), createUserHandler)
}

export default routes