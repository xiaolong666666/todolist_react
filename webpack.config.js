const dev = require('./webpack.config.dev');
const prod = require('./webpack.config.prod');

const TARGET = process.env.NODE_ENV;

if(TARGET === "dev"){
    module.exports = dev;
}

if(TARGET === "build"){
    module.exports = prod;
}