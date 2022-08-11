import {Request, Response} from "express"
import {UserInput} from "../model/user.model"
import { createUser } from "../service/user.service"

export const createUserHandler = async (req: Request<{}, {}, UserInput>, res: Response) => {
    try{
        const user = await createUser(req.body)
        if(user){
            res.status(201).send(user)
        }
    }catch(e:any){
        res.status(403).send(e)
    }
}