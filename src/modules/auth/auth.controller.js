import { Router } from "express";
import { signup, login, getUserById, signupGoogle } from './auth.service.js'
import { RoleEnums, SuccessResponse } from "../../common/index.js";
import { auth } from "../../common/middleware/auth.js";
import { validation } from "../../common/middleware/validation.js";
import { loginSchema, signUpSchema } from "./validationSchema.js"
import { multer_local } from "../../common/middleware/multer.js";
import { multer_enum } from "../../common/enums/multer.enum.js";
import { authorization } from "../../common/middleware/authorization.js";
import { countViews } from "../../common/middleware/views.js";


const router = Router()


router.post('/signup',multer_local( {custom_types: [...multer_enum.image , ...multer_enum.pdf]}).single("photo"),async (req, res) => {

    let userData = await signup(req.body)
    return SuccessResponse({ res, message: "user added", status: 200, data: userData })
  }
)



router.post('/login', async (req, res) => {


  let loginUser = await login(req.body, `${req.protocol} ://${req.host}`) // protocol , host  (dynamic)
  return SuccessResponse({ res, message: "user login", status: 200, data: loginUser })
})


router.get('/get-user-by-id', auth,authorization([RoleEnums.user]),countViews, async (req, res) => {


  let userData = await getUserById(req.userId)
 res.json({
      user: userData,
      count: req.count_views
    })
})


router.get('/get-access-from-refresh', async (req, res) => {

  let { authorization } = req.headers
  let data = await refreshToken(authorization)
  res.json(data)

})



router.post('/signup/gmail' , async (req, res) =>{

let data = await signupGoogle(req.body)  

})

export default router

