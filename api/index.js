global.__basedir = __dirname;
global.__delimiter = "delimiter";
require('dotenv').config()

const { errorHandler, cloudinaryHelper, blacklistCleaner } = require('./util');
const mongoConnector = require('./config/mongo');
const { apiRouter, authRouter } = require('./router');
const cors = require('cors');

//Creates temp dir if it doesn't exist.
cloudinaryHelper.checkTempDir();

mongoConnector()
    .then(() => {
        const config = require('./config/config');
        const app = require('express')();
        require('./config/express')(app);
        blacklistCleaner.start();

        app.use(cors({
            origin: config.origin,
            credentials: true
        }));

        app.use('/api', apiRouter);
        app.use('/auth', authRouter);
        app.use(errorHandler);

        app.listen(config.port, console.log(`API listening on http://localhost:${config.port}/!`));
    })
    .catch(console.error);