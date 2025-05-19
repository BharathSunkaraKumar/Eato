const Vendor = require('../models/Vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

//dotenv
dotEnv.config();
const secretKey = process.env.WhatIsYourName;

const vendorRegister = async(req, res) => {

    const {username, email, password} = req.body;

    try{
        const venderEmail = await Vendor.findOne({email});
        if(venderEmail) {
            return res.status(400).json("Email already used");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVender = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVender.save();
        res.status(201).json({message: "vender registered successfully"});
        console.log('registered')
    }catch(err) {
        console.log(err)
        res.status(500).json({err: "internal server error"})
    }

};

const vendorLogin = async(req, res) => {

    const {email, password} = req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({err: 'Invalid username or password'});
        }
        //token
        const token = jwt.sign({vendorId: vendor._id}, secretKey, {expiresIn: "1h"})
        console.log(token)

        res.status(200).json({success: 'Login successful', token});
        console.log(email);
    }catch(err) {
        if(err) {
            console.log(err)
            res.status(500).json({err: "internal server error"})
        }
    }
}

module.exports = {vendorRegister, vendorLogin};
