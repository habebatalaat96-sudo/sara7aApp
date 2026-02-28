import { ProviderEnums, UnauthorizedException } from "../../common/index.js";
import { ConflictException, NotFoundException } from "../../common/utils/response/index.js";
import { userModel } from "../../database/index.js";
import { findOne, findById ,create } from "../../database/database.service.js";
import { hash, compare } from "bcrypt"
import jwt from 'jsonwebtoken'
import { generateHash, compareHash } from "../../common/index.js";
import fs from "fs"
import { env } from "../../../config/index.js";
import {OAuth2Client} from 'google-auth-library';



const publickey = fs.readFileSync("./public.key")
const privatekey = fs.readFileSync("./private.key")


export const signup = async (data) => {

    let { userName, email, password } = data

    let existUser = await findOne({ model: userModel, filter: { email } })
    if (existUser) {
        return ConflictException({ message: "user already exist" })
    }

    // const salt = await bcrypt.getSalt(+env.salt , "a")
    // let hashedPassword = await hash(password ,+ env.salt)
    // let hashedPassword = await argon2.hash(password)


    let hashedPassword = await generateHash(password)


    let addUser = await userModel.insertOne({ userName, email, password: hashedPassword })
    return addUser
}



export const login = async (data, host) => {

    let { email, password } = data
    //     let existUser = await userModel.findOne({email , password ,provider:ProviderEnums.System }).select("-password -_id")

    let existUser = await findOne({ model: userModel, filter: { email, provider: ProviderEnums.System } })
    if (existUser) {

        let signature = undefined
        let audience = undefined
        switch (existUser.role) {
            case "0":
                signature = env.adminSignature
                audience = "Admin"
                break

            default:
                signature = env.userSignature
                audience = "User"
                break
        }

        console.log(signature);


        // const isMatched = await compare(password , existUser.password)
        // const isMatched = await argon2.verify(existUser.password , password)


        const isMatched = await compareHash(password, existUser.password)
        if (isMatched) {
            // let token = jwt.sign({id : existUser._id } , privatekey , {algorithm : 'RS256'})
            let token = jwt.sign({ id: existUser._id }, signature, {
                expiresIn: '1d',
                // notBefore:"30s", // after 30 s hysht3l ,
                issuer: host,  // ana 5arg mneen ,
                audience
            })

            return { existUser, token }
        }
    }

    return NotFoundException({ message: "user not found" })
}



export const signupGoogle = async (data)=>{

const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
      idToken: data.idToken,
      audience: "123169390463-9tsj7urlbaatqlrf7fdgp8i2lu23vhmv.apps.googleusercontent.com",  
  });
  const payload = ticket.getPayload();
  console.log(payload);

  const {email , email_verified , name , picture} = payload

  let user = await findOne({model:userModel , filter: {email}})
  if(!user) {
    user = await create({
        model:userModel ,
        data:{
            email , 
            confirmed: email_verified,
            userName:name ,
            profilePicture : picture ,
            provider : ProviderEnums.Google
        }
    })
  }


}



export const getUserById = async (userId) => {


    let userData = await findById({ model: userModel, id: userId })
    return userData
}


export const refreshToken = async (token) => {

    let decode = decodeRefresh(token)

    let freshSignature = undefined
    let audience = undefined
    switch (existUser.role) {
        case "0":
            freshSignature = env.AdminRouteRefresh
            audience = "Admin"
            break

        default:
            freshSignature = env.UserRouteRefresh
            audience = "User"
            break
    }

    return { freshSignature }

}