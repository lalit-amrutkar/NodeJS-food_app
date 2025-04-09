const express = require("express") // Add a express middleware
const testController = require("../controllers/testController")  // Add a controller

//router object
const router = express.Router()

// routes GET| POST | UPDATE | DELETE4

router.get('/test-user',  testController)


// export routes
module.exports = router