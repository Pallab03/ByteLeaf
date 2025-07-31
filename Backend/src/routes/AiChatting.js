const express= require('express');
const userMiddleware = require('../middleware/userMiddleware');
const solveDoubt = require('../controllers/solveDoubt');
const aiRotuer = express.Router();

aiRotuer.post('/chat',userMiddleware,solveDoubt);



module.exports= aiRotuer;
