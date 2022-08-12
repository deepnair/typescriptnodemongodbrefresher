import { Request, Response } from "express";
import { createSession, getSessions, updateSession } from "../service/session.service";
import { verifyPassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config"
import log from "../utils/logger"

interface LoginType{
    email: string,
    password: string
}

export const createSessionHandler = async (req: Request, res: Response) => {
    try{
        const user = await verifyPassword(req.body)
        log.info(user)
        let session
        if(user){
            log.info('Entered user in createSessionHandler')
            let session = await createSession({user: user._id, agent: req.get("user-agent") || ""})
            log.info(session)
            if(session){
                const accessToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("accessTokenTtl")})
                const refreshToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("refreshTokenTtl")})

                return res.send({accessToken, refreshToken})
        }}
    }catch(e){
        res.send(e)
    }
}

export const getSessionsHandler = async (req: Request, res: Response) => {
    const user = res.locals.user._id
    const sessions = await getSessions({user: user, valid: true})
    return res.send(sessions)
}

export const logoutSessionHandler = async (req: Request, res: Response) => {
    const user = res.locals.user._id
    const newSession = await updateSession({_id: user.session}, {valid: false})
    return res.send({accessToken: null, refreshToken: null})
}