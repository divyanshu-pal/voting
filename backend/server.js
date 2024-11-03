const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');


require('dotenv').config();
app.use(express.json());

require('./db');
const route = require('./route/route');
app.use('/',route);
app.use(cookieParser());


const PORT = 2000;
app.listen(PORT,(req,res)=>{
    console.log(`listen at ${PORT}`);
})