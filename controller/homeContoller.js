const File=require('../models/files')

module.exports.home= async function(req,res){
    let files=await File.find({}).sort('-createdAt')
    console.log(' home page is loaded')
    res.render('home',{
        files:files,
        title:'CSV Reader'
    })
}
