import dotenv from "dotenv"

dotenv.config({path : "./config/.env"})

const mongoURl = process.env.MONGO_URI
const mood = process.env.MOOD
const port = process.env.PORT
const salt = process.env.SALT
const jwt_key = process.env.JWT_KEY

const userSignature = process.env.JWT_USER_SIGNATURE
const adminSignature = process.env.JWT_ADMIN_SIGNATURE

const AdminRouteRefresh = process.env.JWT_ADMIN_REFRESH_SIGNATURE

const UserRouteRefresh =process.env.JWT_USER_REFRESH_SIGNATURE
export const env = {port  , mongoURl , mood , salt , jwt_key ,userSignature , adminSignature , AdminRouteRefresh ,UserRouteRefresh}
