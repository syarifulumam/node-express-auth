import User from "../models/userModel.js";
import argon2 from 'argon2';

export const getUsers = async (req,res) => {
    try {
        const users = await User.findAll({
            attributes:['id','name','email','role']
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const updateUser = async (req,res) => {
    const {name,email,password,confirmation_password,role} = req.body;
    //find user 
    const user = await User.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: 'User tidak ditemukan'});
    if(password !== confirmation_password) return res.status(400).json({msg: 'Password tidak sama'});
    //hash password
    let hasPassword;
    if(password === "" || password === null){
        hasPassword = user.password;
    }else{
        hasPassword = await argon2.hash(password);
    }
    try {
        await User.update({
            name: name,
            email: email,
            password: hasPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: 'User berhasil diedit'});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const deleteUser = async (req,res) => {
    const user = await User.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: 'User tidak ditemukan'});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: 'User telah dihapus'});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}