const mongoose=require('mongoose')

const fileSchema= new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    filepath:{
        type:String
    },
    filetype:{
        type:String
    }
},
{
    timestamps:true
})

const File=mongoose.model('File',fileSchema)
module.exports=File