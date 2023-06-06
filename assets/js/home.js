
console.log('js file is loaded')
const selecter=document.getElementById('file')
selecter.addEventListener('change',(e) =>{
    const fileList=e.target.files;
    console.log(fileList[0].name)
})

// fs.createReadStream(fileList[0].name)
// .pipe(csv())
// .on('headers',(headers)=>{
//     console.log(headers)
//     heading=headers
// })
// .on('data',(data)=>result.push(data))
// .on('end',()=>{
//     console.log(result)
// })