import multer from "multer"
import fs from "node:fs"
export const multer_local = ({custom_path= "General" , custom_types = []} = {}) => {

    const full_path =  `downloads/${custom_path}`

    if(!fs.existsSync(full_path)){


        fs.mkdirSync(full_path , {recursive:true})
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, full_path)
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-'+ Math.round(Math.random()*1E9)
            cb(null, uniqueSuffix + '_'+ file.originalname)

        }
    })


    function fileFilter(req, file, cb){

        if(!custom_types.includes(file.mimetype)){
            cb(new Error("invalid file type"))
        }

        cb(null , true)
    }
    const upload = multer({ storage: storage  , fileFilter})
    return upload
}