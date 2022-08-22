import User from "../models/userModel.js";
import config from "../config/config.js";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const login = (req,res) => {
    
}
export const register = async (req,res) => {
    const {name,email,password,confirmation_password, role} = req.body;
    //password match
    if(password !== confirmation_password) return res.status(400).json({msg: 'Password tidak sama'});
    const findEmail = await User.findOne({
        where:{
            email: email
        }
    })
    //check email
    if(findEmail !== null) return res.status(400).json({msg: 'Email telah digunakan'});
    const hassPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hassPassword,
            role: role
        })
        res.status(201).json({msg: 'Register berhasil'})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const logout = (req,res) => {

}