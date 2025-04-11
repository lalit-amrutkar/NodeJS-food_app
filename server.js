// dot env configuration
const dotenv = require("dotenv");
dotenv.config();


const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");


// DB Connection
connectDB();

//Rest object
const app = express();

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//route
app.use("/api/v1/auth", require("./routes/testRouter"));
app.use("/api/v1/auth", require("./routes/authRouter"));
app.use("/api/v1/user", require("./routes/userRouter"));


app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to food Server</h1>")
});

console.log(process.env.PORT)

// Port
// const PORT = process.env.PORT || 5000;


const PORT = 8080;

app.use((err, req, res, next) => {
    console.error('Global Error Handlers:', err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
