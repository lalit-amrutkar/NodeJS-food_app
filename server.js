const express = require("express");
const colors  = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv")


// dot env configuration
dotenv.config()
//Rest object
const app = express();

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//route
//URL = http://localhost:8080
app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Welcome to food Server</h1>")
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Node Server Running ${PORT}`.bgWhite.red);
});