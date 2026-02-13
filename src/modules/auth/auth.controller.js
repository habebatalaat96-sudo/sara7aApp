import { Router } from "express";
import { signup , login ,getUserById} from './auth.service.js'
import { SuccessResponse } from "../../common/index.js";
const router = Router()


router.post('/signup' ,async (req , res)=>{

    let userData = await signup(req.body)
  return SuccessResponse({res , message :"user added" , status : 200 , data : userData})
})



router.post('/login' ,async (req , res)=>{

    let loginUser = await login(req.body)
  return SuccessResponse({res , message :"user login" , status : 200 , data : loginUser})
})


router.get('/get-user-by-id' ,async (req , res)=>{

    let userData = await getUserById(req.headers)
    res.json(userData)

})


export default router

