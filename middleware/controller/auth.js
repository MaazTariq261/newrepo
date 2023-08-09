import User from '../Models/User.js';
import {StatusCodes } from 'http-status-codes';
import {BadRequestError} from '../errors/bad-request.js'
import {UnauthenticatedError} from '../errors/unauthenticated.js';
import bcrypt from 'bcryptjs';





export const register = async(req,res)=>
{
    
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token});
}

export const login =async (req,res)=>
{
    const {email,password}= req.body;

    if(!email||!password)
    {
        throw new BadRequestError('Give Email and Password');
    }

    const user = await User.findOne({email});

    if(!user)
    {
        throw new UnauthenticatedError('This email does not Exist');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    console.log(isPasswordCorrect);
    if(!isPasswordCorrect)
    {
        throw new UnauthenticatedError('This Password does not Exist');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name}, token});
 
}

//export default {register,login};
