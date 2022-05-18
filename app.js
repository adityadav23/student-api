const express = require('express');

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const authMiddleware = require('./middleware/authentication')
const app = express();


app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>');
})

app.use('/api/v1/user', authRouter);
app.use('/api/v1/user', authMiddleware, userRouter);


module.exports = app;