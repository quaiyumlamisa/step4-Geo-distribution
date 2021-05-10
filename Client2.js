const axios=require('axios');
const io=require('socket.io-client');
//chittagong server socket
let socket=io.connect('http://10.100.0.12:8080');


var ridercount=0;
var drivercount=0;

var rname;
var dname;
var car;

var path='http://chittagong.server.com';

function random(max,min)
{
   return Math.random() * (max - min) + min;
}


function getInteger(min, max) {
     return Math.floor(Math.random() * (max - min + 1) ) + min;
   }
   

var ridercount=0;
var drivercount=0;


setInterval(()=>
{
   ridercount++;
   rname='Rider'+ridercount;

  
    axios({
        method: 'post',
        url: path+':8000/rider',
        data: {
                RName: rname, 
                xrc: random(1.1,99.8),
                yrc:random(1.1,99.8),
                xrd:random(1.1,99.8),
                yrd:random(1.1,99.8)
              }
         })



    .then(res => 
         {
           //console.log(res)
         })


    .catch(error =>
       {
        // console.error(error)
       })

     

 },1000);



 setInterval(()=>
 {
    drivercount++;
    //console.log(drivercount);
    dname='Driver'+drivercount;
    car='c'+drivercount;
 
   
     axios({
         method: 'post',
         url: path+':8000/driver',
         data: {
                 DName: dname, 
                 car: car,
                 xd:random(1.1,99.8),
                 yd:random(1.1,99.8)
               }
          })
 
 
 
     .then(res => 
       {
      
       // console.log(res)
       })
 
 
     .catch(error =>
       
     {
       //console.error(error)
     })
 
     
   
   },1000);


   var count=0;
   socket.on("task",(data)=>
   {

    if(data[count])
    {
    console.log(data[count].Rider+" has found "+ data[count].Driver+" and fair is "+data[count].Fair);
    
    
    axios({
      method: 'post',
      url: path+':8000/rating',
      data: {
              DriverName:data[count].Driver,
              Rating: getInteger(0,5)
            }
        })
  
 
 
 .then(res => 
   {
   
   // console.log(res)
   })
 
 
 .catch(error =>
   
 {
 // console.error(error)
 })

   count++;
  // console.log(js.Driver);

    }
    });
 







 

