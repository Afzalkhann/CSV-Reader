const fs=require('fs')
const csv=require('csv-parser')
const File=require('../models/files')
// to delete file from db and folder
module.exports.delete=async function(req,res){
    try{
        let file=await File.findById(req.query.id)
        fs.unlinkSync(file.filepath)
         await File.findByIdAndDelete(req.query.id)
         
         res.redirect('back')


    }catch(err){
        console.log('internel server error',err)
        res.redirect('back')
    }
}

// to fetech data from the uploaded file
module.exports.data=async function(req,res){
    try{
        const result=[]
        let heading=[]
        let file=await File.findById(req.query.id)
        function uploadCsv(path){
            
            if(fs.existsSync(path)){
                fs.createReadStream(path)
                .pipe(csv())
                .on('headers',(headers)=>{
                    console.log(headers)
                    heading=headers
                })
                .on('data',(data)=>result.push(data))
                .on('end',()=>{
                
                    res.render('filedata',{
                        heading:heading,
                        data:result,
                        title:'CSV Reader'
                    })
                    
                })
            }else{
                res.redirect('back')
            }   
        }
        uploadCsv(file.filepath)
    }catch(err){

    }

}

// to import uploaded file details to the DB
module.exports.import=async function(req,res){
    try{

        let file=await File.create({
            filename:req.file.filename,
            filepath:req.file.path,
            filetype:req.file.mimetype
        })
    
    
    // console.log(req.body.name)
    
    
        res.redirect('back')
    }catch(err){

    }
}
