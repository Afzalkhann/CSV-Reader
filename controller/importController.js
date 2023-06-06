const fs=require('fs')
const csv=require('csv-parser')
const File=require('../models/files')

module.exports.data=async function(req,res){
    try{
        const result=[]
        let heading=[]
        let file=await File.findById(req.query.id)
        console.log('got file')
        function uploadCsv(path){
            console.log(path)
            if(fs.existsSync(path)){
                fs.createReadStream(path)
                .pipe(csv())
                .on('not')
                .on('headers',(headers)=>{
                    //console.log(headers)
                    heading=headers
                })
                .on('data',(data)=>result.push(data))
                .on('end',()=>{
                    
                    console.log(result)
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
module.exports.import=async function(req,res){
    try{

        let file=await File.create({
            filename:req.file.filename,
            filepath:req.file.path,
            filetype:req.file.mimetype
        })
    
    
    // console.log(req.body.name)
    
    
        console.log("file is uploaded")
        res.redirect('back')
    }catch(err){

    }
}
