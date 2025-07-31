const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const { generateUploadSignature, saveVideoMetadata, deleteVideo } = require('../controllers/videoSection');
const videoRouter= express.Router();



videoRouter.get("/create/:problemId",adminMiddleware,generateUploadSignature);
videoRouter.post("/save",adminMiddleware,saveVideoMetadata);
videoRouter.delete("/delete/:problemId",adminMiddleware,deleteVideo);


module.exports= videoRouter;