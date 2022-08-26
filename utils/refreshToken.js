import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const refreshToken = async (req,res) => {
    try {
        const refreshToken = req.cookies.Token;
        if(!refreshToken) return res.sendStatus(401);
        const user = User.findOne({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, config.refreshKey, (err,decode) => {
            if(err) return res.sendStatus(403);
            const name = user.name;
            const email = user.email;
            const accessToken = jwt.sign({name,email}, config.accessKey, {expiresIn: '15s'});
            res.json({accessToken});
        })
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

