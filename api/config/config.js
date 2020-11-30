const env = process.env.MY_NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.MY_API_PORT || 3000,
        mongoURL: 'mongodb://localhost:27017/car_shop',
        origin: ['http://localhost:4200']
    },
    production: {
        port: process.env.MY_API_PORT || 3000,
        mongoURL: process.env.MY_DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];