# Nodejs backend with express, mongoDB in Typescript Refresher

This is a refresher of the Nodejs backend built with express with a MongoDB database in Typescript in [Express, Node, and MongoDB Example in Typescript](https://github.com/deepnair/typescriptnodemongodbexample) repository.

## Notes to remember
1. prettyPrint from pino in the logger.ts in the utils folder is now deprecated, so instead it has be written as follows:
    ```ts
    import logger from "pino"

    const log = logger({
        transport: {
            target: 'pretty-print'
        }
    })
    ```
    The rest in logger.ts is the same.
1. Remember to await the comparePassword method of user when we call it in the verifyPassword function in user.service.ts.
1. When entering the privateKey and publicKey from the .pem files you generate with openssl in the default.ts in the config folder, remember to use backticks (`) at the beginning and end. It will not work if you use single or double quotes.
1. In the private & public key, remember to ensure that the endlines are on a separate line and there are no tabs within the backticks at the beginning of lines after the first line.
1. In the deserializeUser.ts in middleware, after you call the reissueAccessToken function from the session.service.ts, remember to decode the accessToken again to get the user to put in res.locals.user. 
1. After you get the new access token, also be sure to do:
    ```ts
    res.setHeader('x-access-token', accessToken)
    ```
1. When updating anything, whether it is in the logout function or for updating the product use findOneAndUpdate rather than updateOne if you want to use the option {new:true} after the update query and display the changed result back.
1. In the updateProductSchema in product.schema.ts, you can have the zod fields by optional for the body of the updateProductSchema by doing the following:
    ```ts
    import {object, string, number} from "zod"

    const params = {
        params: object({
            productId: string({
                required_error: 'A productId is required'
            })
        })
    }
    const body = {
        body: object({
            name: string({
                required_error: 'Your product needs to have a name'
            }),
            image: string(),
            price: number({
                required_error: 'Your product needs a price'
            }),
            description: string({
                required_error: 'Your product needs a description'
            }).min(100, 'Your description should have atleast 100 characters')
        })
    }

    const updateBody = {
        body: body.body.partial()
    }

    const updateProductSchema = object({...params, ...updateBody})
    ```
1. Always remember to extend mongoose.Document in the UserDocument, SessionDocument and ProductDocument or the _id, _v that is automatically added by MongoDB are not accounted for in the types.

