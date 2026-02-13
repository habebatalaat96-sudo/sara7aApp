import { model } from "mongoose"

export const findOne = async({

    model , 
    filter ={},
    select = '' ,
    options ={}
})=>{


    let doc =  model.findOne(filter)
    if(select.length){
        doc.select(select)
    }
    if(options.populate){
        doc.populate(options.populate)
    }

    return await doc
}



export const findById = async ({

    model , 
    id
})=>{

    return await model.findById(id)
}
