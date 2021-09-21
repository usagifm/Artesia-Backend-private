import jwt from 'jsonwebtoken'
import { User } from "../../db/models";

const AuthController = {
async adminGoogleLogin(req, res, next){
    if(!req.user){
        return res.status(401).send({error: 'User was not authenticate'})
    }
    const {email} = req.user;
    const user = await User.findOne({where: {email, role: 'Admin'}});
    const token = jwt.sign({user}, process.env.JWT_SECRET,
        {
            expiresIn: '2h' 
       }
       )

    if(!user){
        return res.status(401).send({error: 'Unauthorized'})
    }

    return res.status(200).send({token, user})
}

};

export default AuthController;