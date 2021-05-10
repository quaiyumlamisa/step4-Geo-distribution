const express=require('express');
const http=require('http');
const app=express();
const port=8080;
const server=http.createServer(app);

const socket=require('socket.io');
const io=socket(server);

var count=0;
var st;
var data=[];

app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());

//rider endpoint
app.post('/communication',(req,res)=>
{
 
   data=JSON.parse(JSON.stringify(req.body));

   
   if(data[count])
   {

   st=data[count].Rider+" has found "+ data[count].Driver+" and fair is "+data[count].Fair;
   console.log(st);

   count++;
   }
   
});


io.on("connection",(socket)=>
{
  //console.log("Server-Client Connected!");

  //if(data.length!==0)
  //{
      setInterval(()=>
      {
        socket.emit('task',data);    
      },1000);
//}
});


server.listen(port,()=>
{
    console.log("Server is listening on localhost:"+port);
});                            
  
