import User from "../models/userModel.js";
import config from "../config/config.js";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const login = async (req,res) => {
    try {
        if(!req.body.email && !req.body.password) return res.status(400).json({msg: 'Tidak boleh kosong'})
        const user = await User.findOne({
            where:{
                email: req.body.email
            }
        });
        //check user
        if(user === null) return res.status(400).json({msg: 'Email tidak terdaftar'});
        //check password
        const checkPassword = await argon2.verify(user.password,req.body.password);
        if(checkPassword === false) return res.status({msg: 'Password salah'});
        const name = user.name;
        const email = user.email;
        //create token
        const accessToken = jwt.sign({name,email}, config.accessKey, {expiresIn: '20s'});
        const refreshToken = jwt.sign({name,email}, config.refreshKey, {expiresIn: '1d'});
        await User.update({refresh_token: refreshToken}, {
            where:{
                id: user.id
            }
        });
        //create cookie
        res.cookie('Token', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1day
        });
        res.json({accessToken});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const register = async (req,res) => {
    const {name,email,password,confirmation_password, role} = req.body;
    //password match
    if(password !== confirmation_password) return res.status(400).json({msg: 'Password tidak sama'});
    const findEmail = await User.findOne({
        where:{
            email: email
        }
    });
    //check email
    if(findEmail !== null) return res.status(400).json({msg: 'Email telah digunakan'});
    const hassPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hassPassword,
            role: role
        });
        res.status(201).json({msg: 'Register berhasil'});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const logout = async (req,res) => {
    const refreshToken = req.cookies.Token
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user) return res.sendStatus(204)
    const userId = user.id
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('Token');
    return res.sendStatus(200)
}