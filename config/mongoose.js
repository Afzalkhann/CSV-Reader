const mongoose=require('mongoose')
mongoose.connect(`mongodb://localhost/csv_reader`)
const db=mongoose.connection;

db.on('error',console.error.bind(console,"error in connecting to db"))


db.once('open',function(){
    console.log('connected to database:: mongodb')
})



module.exports=db