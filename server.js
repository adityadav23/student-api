require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');

const connectDb = require('./db/connectDb');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer(){
    await connectDb(process.env.MONGO_URI);;

    server.listen(PORT, ()=>{
        console.log(`Server is listening on ${PORT}...`);
    })
}



mongoose.connection.on('open',()=>{
    console.log('Database connection successful!')
})

mongoose.connection.on('error',(err)=>{
    console.log(err);
})

startServer();
