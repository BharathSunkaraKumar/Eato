const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

//dotenv
dotEnv.config();
const secretKey = process.env.WhatIsYourName;

const verifyToke =  async(req, res, next) => {
    const token = req.headers.token;
    if(!token) {
        return res.status(401).json({error: 'Token is required'});
    }
    try{
        const decoded = jwt.verify(token, secretKey);
        const vendor = await Vendor.findById(decoded.vendorId);
        if(!vendor) {
            return res.status(404).json({error: "vendor not found"});
        }
        req.vendorId = vendor._id;
        next()
    }catch(err){
        if(err){
            res.status(500).json({err: "Invalid token"});
        }
    }
}

module.exports = verifyToke;