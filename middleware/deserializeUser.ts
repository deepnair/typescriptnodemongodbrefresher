import { NextFunction, Request, Response } from "express";
import { get, random } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";
import log from "../utils/logger"

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/Bearer\s/, "")
    const refreshToken = get(req, "headers.x-refresh", "")
    log.info(`${accessToken}, refreshToken: ${refreshToken}`)
    const {decoded, expired} = verifyJwt(accessToken)
    log.info(`${decoded}, ${expired}`)

    if(decoded && !expired){
        res.locals.user = decoded
        return next()
    }

    if(refreshToken && expired){
        log.info('Entered reissue area')
        const accessToken = await reIssueAccessToken(refreshToken)
        if(accessToken){
            log.info(`Access Token in reissueAccessToken is ${accessToken}`)
            res.setHeader('x-access-token', accessToken)
            const {decoded} = verifyJwt(accessToken)
            res.locals.user = decoded
            return next()
        }
    }

    return next()

}

export default deserializeUser