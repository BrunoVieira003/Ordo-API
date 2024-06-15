import swaggerAutogen from 'swagger-autogen';

const doc = {
    openapi: '3.0.0',
    info: {
        title: 'Ordo API',
        description: 'API for management of tasks and related entities'
    },
    host: 'localhost:8000',
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
};

const outputFile = './swagger.json';
const routes = ['./routes/routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);