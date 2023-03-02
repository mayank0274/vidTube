const mongoose = require("mongoose")

mongoose.connect(`${process.env.MONGO_CONN_URL}`)
.then(()=>{
  console.log("db connected")
})
.catch((err)=>{
  
  console.log("error while connecting to db")
 console.log(err)
})
