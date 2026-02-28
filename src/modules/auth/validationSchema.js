import joi from "joi"

import { GenderEnums } from "../../common/enums/enum.service.js"
export const signUpSchema = {

    body : joi.object({
        userName: joi.string().length(6).alphanum().uppercase().not("ali"),
        password: joi.string().required(),
        cPassword: joi.string().valid(joi.ref("password")),

        email: joi.string().email({tlds:true}),
        age:joi.number().min(20).max(40).integer().positive() ,
        gender : joi.string().valid(...Object.values(GenderEnums)),
        flag: joi.boolean().truthy("yes","y" , "1").falsy("no" , "n" ,"0").sensitive(),
        DOB: joi.date().greater("now"),
        user:joi.object({
            name:joi.string().required()
        }),
        bestSkills: joi.array().items(joi.string()),
        favSkills: joi.string().valid(joi.in("bestSkills"))

    }).options({presence:"required"})
}

    
export const loginSchema = {

    body : joi.object({
        password: joi.string().required(),
        email: joi.string().required()


    }).required()    ,

    query : joi.object({
        x: joi.string().required()

    }).required()    
}