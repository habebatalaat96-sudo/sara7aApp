
import { userModel } from "../../database/model/user.model.js"
export const authorization = (roles = [])=>{

    return  async (req , res , next) =>{


        if(!roles.includes(userModel.role)){
            throw new Error("un authorized")
        }
    
    next()
}
}