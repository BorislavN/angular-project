global.__basedir = __dirname;
require('dotenv').config()

const mongoConnector = require('./config/mongo');
const { errorHandler } = require('./util');
//const apiRouter = require('./router');
const cors = require('cors');

mongoConnector()
    .then(() => {
        const config = require('./config/config');
        const app = require('express')();
        require('./config/express')(app);

        app.use(cors({
            origin: config.origin,
            credentials: true
        }));

        //app.use('/api', apiRouter);

        app.use(errorHandler);

        app.listen(config.port, console.log(`API listening on http://localhost:${config.port}/!`));
    })
    .catch(console.error);