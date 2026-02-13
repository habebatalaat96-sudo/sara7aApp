import { ProviderEnums, UnauthorizedException } from "../../common/index.js";
import { ConflictException, NotFoundException } from "../../common/utils/response/index.js";
import { userModel } from "../../database/index.js";
import { findOne , findById} from "../../database/database.service.js";
import {hash , compare} from "bcrypt"
import jwt from 'jsonwebtoken'
import { generateHash , compareHash } from "../../common/index.js";
import { model } from "mongoose";



export const signup = async (data)=>{

    let {userName , email , password} = data

    let existUser = await findOne({model : userModel , filter : {email}})
    if(existUser){
        return ConflictException({message : "user already exist"})
    }

    // const salt = await bcrypt.getSalt(+env.salt , "a")
    // let hashedPassword = await hash(password ,+ env.salt)
        // let hashedPassword = await argon2.hash(password)


    let hashedPassword = await generateHash(password)


let addUser = await userModel.insertOne({userName , email , password :hashedPassword})
return addUser
}



export const login = async (data)=>{

    let {email , password} = data
//     let existUser = await userModel.findOne({email , password ,provider:ProviderEnums.System }).select("-password -_id")

    let existUser = await findOne({model:userModel , filter:{email ,provider:ProviderEnums.System } })
    if(existUser){

        // const isMatched = await compare(password , existUser.password)

        // const isMatched = await argon2.verify(existUser.password , password)


        const isMatched = await compareHash(password , existUser.password)
        if(isMatched){
            let token = jwt.sign({id : existUser._id } , 'route')
            return {existUser , token}
        }
    }

    return NotFoundException({message : "user not found"})
}






export const getUserById = async (headers)=>{

    let {authorization} = headers
    if(!authorization){
        UnauthorizedException("UN authorization")
    }
    let decoded =  jwt.verify(authorization , "route")
let userData = await findById({model : userModel , id:decoded.id})
return userData
}


