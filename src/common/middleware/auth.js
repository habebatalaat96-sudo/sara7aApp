import { env } from "../../../config/index.js"

import jwt from 'jsonwebtoken'
import { UnauthorizedException } from "../utils/response/index.js"

import fs from "fs"

const publickey = fs.readFileSync("./public.key" , "utf-8")
export const auth = (req , res ,next)=>{


    let {authorization} = req.headers
    if(!authorization){
        UnauthorizedException("un authorized")
    }

let decoded = jwt.decode(authorization)

let signature = undefined

switch (decoded.aud){
    case "Admin":
        signature = env.adminSignature
        break

    default:
        signature = env.userSignature
        break    
}

console.log(signature);

let decodedData = jwt.verify(authorization , signature)
console.log(decodedData);

req.userId = decodedData.id
next()
}