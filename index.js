const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const db=require('./config/mongoose')
const router=express.Router()
const homeController=require('./controller/homeContoller')
const importControlller=(require('./controller/importController'))
const port=8000
const session=require('express-session')
const csv= require('csv-parser')
const fs=require('fs')
const multer=require('multer')
const path=require('path')

app.use(express.static('./assets'))
app.use('/uploads',express.static(__dirname+'/uploads'))
//app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
let storage=multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,'./'+__dirname+'/uploads/')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+'-'+Date.now() +path.extname(file.originalname) )
    }
})

let upload=multer({storage:storage})


app.use(express.urlencoded())
app.set('view engine','ejs');
app.set('views','./views');
//app.use('/',require('./routers/'))
app.get('/',homeController.home)
app.post('/import-csv',upload.single('file'),importControlller.import)
app.get('/file',importControlller.data)
//     // console.log(req.body.name)
    
//     // uploadCsv(__dirname+'/uploads/'+req.file.filename)
//     console.log("file is uploaded")
//     res.redirect('back')
// })

function uploadCsv(path){
    

    fs.createReadStream(path)
    .pipe(csv())
    .on('headers',(headers)=>{
        console.log(headers)
        heading=headers
    })
    .on('data',(data)=>result.push(data))
    .on('end',()=>{
        console.log(result)
    })
}
app.use(session({
    name:'csv reader',
    secret:'jgjags',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}))

app.listen(port,function(err){
    if(err){
        console.log('tehre is a error',err)
    }
    console.log("server is up with the port",port)
})


