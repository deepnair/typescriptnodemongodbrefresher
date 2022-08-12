import {Express, Request, Response} from 'express'
import { createUserHandler } from './controller/user.controller'
import { validateResource } from './middleware/validateResource'
import { createUserSchema } from './schema/user.schema'
import createSessionSchema from './schema/session.schema'
import { createSessionHandler, getSessionsHandler, logoutSessionHandler } from './controller/session.controller'

const routes = (app: Express) => {
    app.route('/healthcheck').get((req: Request, res: Response) => res.sendStatus(200))

    app.route("/api/v1/createuser").post(validateResource(createUserSchema), createUserHandler)
    
    app.route('/api/v1/login').post(validateResource(createSessionSchema), createSessionHandler)
    app.route('/api/v1/getSessions').get(getSessionsHandler)
    app.route('/api/v1/logout').post(logoutSessionHandler)
}

export default routes