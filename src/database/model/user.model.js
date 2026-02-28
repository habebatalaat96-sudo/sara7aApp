import mongoose from "mongoose";
import { GenderEnums, RoleEnums } from "../../common/index.js";
import { ProviderEnums } from "../../common/index.js";

const userSchema =new mongoose.Schema({

    firstName :{
        type :String ,
        required : true ,
        minLength :2 ,
        maxLength :20
    },

     lastName :{
        type :String ,
        required : true ,
        minLength :2 ,
        maxLength :20
    },
    email :{
        type :String ,
        unique: true ,
        required : true
    },

     password : {
        type :String ,
        required : function(){
            return this.provider == ProviderEnums.Google ? false : true
        }

    },
    phone : {
        type :String ,
        required : true

    },
    phone :String ,
    DOB : Date ,
    gender :{
        type : String ,
        enum : Object.values(GenderEnums) ,
        default : GenderEnums.Male
    },
    provider : {
         type : String ,
        enum : Object.values(ProviderEnums) ,
        default : ProviderEnums.System
    } ,
    role: {

        type:String ,
        enum : Object.values(RoleEnums) ,
        default : RoleEnums.User

    }
})

userSchema.virtual('userName').set(function(value){

    let [firstName , lastName] = value.split(" ")
    this.firstName = firstName
    this.lastName = lastName

}).get(function(){
    return `${this.firstName} ${this.lastName}`
})

export const userModel = mongoose.model("user" , userSchema)

