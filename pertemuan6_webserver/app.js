const { fstat } = require('fs');
const http = require ('http');
const fs = require('fs')

const panggilPage = (path, res)=>{
    fs.readFile(path,(err,data)=>{
        if(err){
            res.writeHead(404);
            res.write('error: page not found');
        } else {
            res.write(data)
        }
        res.end();
    })
}

http.createServer((req,res)=>{
    const url = req.url;
    console.log(url)
    res.writeHead(200,{
        'Content-Type':'text/html',
    });
    
    if (url==='/about'){
        // fs.readFile('./about.html',(err,data)=>{
        //     if(err){
        //         res.writeHead(404);
        //         res.write('error: page not found');
        //     } else {
        //         res.write(data)
        //     }
        //     res.end();
        // })
        
        panggilPage('about.html', res)
    } else if (url =='/contact'){
        // fs.readFile('./contact.html',(err,data)=>{
        //     if(err){
        //         res.writeHead(404);
        //         res.write('error: page not found');
        //     } else {
        //         res.write(data)
        //     }
        //     res.end();
        // }
        panggilPage('contact.htmk',res)
    } else {
        // fs.readFile('./index.html',(err,data)=>{
        //     if(err){
        //         res.writeHead(404);
        //         res.write('error: page not found');
        //     } else {
        //         res.write(data)
        //     }
        //     res.end();
        // })
        panggilPage('index.html',res)
        
    }
    
})
.listen(3000,()=>{
    console.log('server is running on port 3000')
});