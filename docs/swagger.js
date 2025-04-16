const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        swagger: '2.0', // ✅ Swagger 2.0 version
        info: {
            title: 'Food App API',
            version: '1.0.0',
            description: 'API documentation using Swagger 2.0',
        },
        host: 'localhost:8080', // ✅ Required in Swagger 2.0
        basePath: '/',           // ✅ Set base path for your endpoints
        schemes: ['http'],       // Optional: http or https
    },
    apis: ['./routes/*.js'], // Adjust path to match your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
