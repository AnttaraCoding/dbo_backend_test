const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')
const express = require('express')
require('express-group-routes')
const app = express();

const env = require('./config/config')
const port = env.port

const logger = require('morgan')
const bodyParser = require('body-parser') 
const cors = require('cors')


app.use(cors());
app.use(logger('dev'));

// app.use(`/${process.env.IMG_ROOT}/`, express.static('app/public/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const route = require('./routes/');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
route(app);

app.listen(port, () => console.log(`Running on 172.18.135.223:${port}`))