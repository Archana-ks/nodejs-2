const express = require("express")
const fs = require("fs")
const path = require("path");

{/*
  installation setup
  1.npm init
  2.npm i express
  3.npm i nodemon
*/}

const data = [
    {
        id:"1",
        numberOfSeats:20,
        amenities:["AC","chairs","discolights"],
        priceForAnHour:15000,
        ifBooked:"Booked",
        customerName:"Archana",
        date:"20-04-2023",
        startTime:"20-april-2023 at 12am",
        endTime:"21-april-2023 at 12pm",
        RoomeId:11,
        RoomName:"Duplex"
    },
    {
        id:"2",
        numberOfSeats:10,
        amenities:["AC","chairs","discolights"],
        priceForAnHour:"",
        ifBooked:"vacant",
        customerName:"",
        date:"",
        startTime:"",
        endTime:"",
        RoomeId:101,
        RoomName:"Duplex"
    },
    {
        id:"3",
        numberOfSeats:60,
        amenities:["AC","chairs","discolights","internetAccess"],
        priceForAnHour:7000,
        ifBooked:"Booked",
        customerName:"Sri",
        date:"05-04-2022",
        startTime:"5-april-2022 at 12am",
        endTime:"6-april-2022 at 12pm",
        RoomeId:105,
        RoomName:"suite"
    },
    {
        id:"4",
        numberOfSeats:30,
        amenities:["AC","chairs","discolights"],
        priceForAnHour:"",
        ifBooked:"vacant",
        customerName:"",
        date:"",
        startTime:"",
        endTime:"",
        RoomeId:301,
        RoomName:"Duplex"
    },
    {
        id:"5",
        numberOfSeats:20,
        amenities:["AC","chairs","discolights","internetAccess"],
        priceForAnHour:10000,
        ifBooked:"Booked",
        customerName:"Sri",
        date:"20-04-2023",
        startTime:"20-april-2023 at 12am",
        endTime:"21-april-2023 at 12pm",
        RoomeId:107,
        RoomName:"Duplex"
    },
]

const app = express()

app.use(express.json())

app.get("/", function (req, res) {
    res.send(data);
  });

//get hall details

app.get("/hall/details",(req,res)=>{
       
    if(req.query){
    const {ifBooked}=req.query;
    //url query 
    console.log(ifBooked)

    let filterdHall = data;
    if(ifBooked){
        filterdHall =  filterdHall.filter((halls)=>halls.ifBooked===ifBooked)

    }
    res.send(filterdHall)
}else{
    res.send(data)   
}
})

app.get("/hall/details/:id",(req,res)=>{
    const {id}=req.params;
    console.log(id)
    const specificHall =data.find(hall=>hall.id===id)

    res.send(specificHall)
})

//new hall

//1.creating a room

app.post("/hall/details/",(req,res)=>{
    const newHall ={
        id:data.length+1,
        numberOfSeats:req.body.numberOfSeats,
        amenities:req.body.amenities,
        RoomId:req.body.RoomId,
        customerName:req.body.customerName,
        date:req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        RoomName:req.body.RoomName,

    }
    console.log(req.body);
    data.push(newHall);
    res.send(data);
 })

 //2.Booking a Room

 app.put("/hall/details/:id",(req,res)=>{
    const {id}= req.params;
    const halls = data.find(hall=>hall.id===id);
    if(halls.ifBooked==="Booked"){
        res.status(400).send("Hey the hall is already booked")
    }else{
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    halls.customerName = req.body.customerName;
    halls.ifBooked="Booked"
    res.status(200).send(data)
    }
 })

 //3.List all rooms with booked data

 app.get("/booked/halls",(req,res)=>{
    res
    .status(200)
    .send(
        data.map((room)=>{
            if(room.ifBooked==="Booked"){
                return{
                    "RoomName":room.RoomName,
                    "ifBooked":room.ifBooked,
                    "customerName":room.customerName,
                    "date":room.date,
                    "StartTime":room.startTime,
                    "endTime":room.endTime
                }
            } else{
                return{"RoomName":room.RoomName, "ifBooked":"vacant"}
            }
        })
    )
 })

 //4.List all customers with booked data

 app.get("/customer/details",(req,res)=>{
    res
    .status(200)
    .send(
        data.map((room)=>{
            if(room.ifBooked==="Booked"){
                return{
                    "customerName":room.customerName,
                    "RoomName":room.RoomName,
                    "date":room.date,
                    "StartTime":room.startTime,
                    "endTime":room.endTime
                }
            } else{
                
                return{"RoomName":room.RoomName, "ifBooked":"vacant"}
            }
        })
    )
 })



app.listen(5000, ()=>console.log(`server started in localhost:5000`))
