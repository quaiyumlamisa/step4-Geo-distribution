const axios=require('axios');
const express=require('express');
const http=require('http');

const app=express();
const port=8080;
const server=http.createServer(app);


var rider=[];
var driver=[];
var result=[];
var fair;

var servername = process.env.LOCATION;
console.log('--------------------'+servername);
var u = 'http://communicationservice-'+servername+':8080/communication';



app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());


//rider endpoint
app.post('/rider',(req,res)=>
{
  
  var s=JSON.parse(JSON.stringify(req.body));
  console.log(s.RName+" is looking for a driver.......");
  rider.push(s);
 // console.log(rider); 
});


app.post('/driver',(req,res)=>
{
  var s1=JSON.parse(JSON.stringify(req.body));
  console.log(s1.DName+ " is looking for a rider.......");
  driver.push(s1);
 // console.log(driver);
});


function dis(x1,y1,x2,y2)
{
      var xDiff = x1 - x2; 
      var yDiff = y1 - y2;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}


setInterval(()=>
{
    
     for(var i=0;i<rider.length;i++)
     {
        fair=0.0;
        var marker=-1;
        var distance=Number.MAX_VALUE;


        for(var j=0;j<driver.length;j++)
          {
                temp=dis(rider[i].xrc,rider[i].yrc,driver[j].xd,driver[j].yd);
        
                if(temp<distance)
                {
                    distance=temp;
                    marker=j;
                }
          }

                fair=2*distance;

                var output=
                {
                  "Rider" : rider[i].RName,
                  "Driver" : driver[marker].DName,
                  "Carname": driver[marker].car,
                  "Fair": fair
                 };


                result.push(output);
                //console.log(output);

                rider.splice(i,1);
                driver.splice(marker,1);

        }

},5000);


setInterval(()=>
 {  
     if(result.length!==0)
     {
            axios({
                method: 'post',
                url: u,
                data: result
                  })
        
            .then(res => 
              {
              // console.log(res)8c44deef49b0
              })
        
        
            .catch(error =>
            {
              // console.error(error)
            })
      }
 
   },1000);


server.listen(port,()=>
{
    console.log("Server is listening on localhost:"+port);
});

