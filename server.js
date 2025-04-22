// dot env configuration
const dotenv = require("dotenv");
dotenv.config();


const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');



// DB Connection
connectDB();

//Rest object
const app = express();


//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//route
app.use("/api/v1/auth", require("./routes/testRouter"));
app.use("/api/v1/auth", require("./routes/authRouter"));
app.use("/api/v1/user", require("./routes/userRouter"));
app.use("/api/v1/restaurant", require("./routes/restaurantRouter"));
app.use("/api/v1/category", require("./routes/categoryRouter"));
// app.use("/api/v1/product", require("./routes/productRouter"));   
// app.use("/api/v1/coupon", require("./routes/couponRouter"));
// app.use("/api/v1/cart", require("./routes/cartRouter")); 
// app.use("/api/v1/order", require("./routes/orderRouter"));

// Port
// const PORT = process.env.PORT || 5000;


const PORT = 8080;

app.use((err, req, res, next) => {
    console.error('Global Error Handlers:', err.stack);
    res.status(500).send('Something broke!');
});



// Listen
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
