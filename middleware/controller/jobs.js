import Job from '../Models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/bad-request.js';
import { NotFoundError } from '../errors/not-found.js';


export const getAllJobs = async(req,res)=>
{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs , count : jobs.length});
}

export const getJob = async(req,res)=>
{
    const {user:{userId},params:{id:jobId}}=req;

    const job = await Job.findOne({
        _id:jobId,createdBy:userId
    });

    if(!job)
    {
        throw new NotFoundError(`No job with Id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job});

}

export const createJob = async(req,res)=>
{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job});
}

export const updateJob = async(req,res)=>
{
    const { body:{ company , position},
            user:{ userId}, params:{id:jobId},} = req;

    if(!company || ! position)
    {
        throw new BadRequestError('Company or Position Empty');
    }

    
    const job = await Job.findByIdAndUpdate(
        {
            _id:jobId , createdBy : userId
        },
        req.body,
        {
            new : true , runValidators :true
        }
    )

    if(!job)
    {
        throw new NotFoundError(`No Job Found again Id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job});



}

export const deleteJob = async(req,res)=>
{
    const {user:{userId},params:{id:jobId}}=req;

    const job = await Job.findByIdAndRemove({
        _id:jobId,createdBy:userId
    });

    if(!job)
    {
        throw new NotFoundError(`No job with Id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({msg:'Deleted'});

}

//export default {getAllJobs,getJob,createJob,updateJob,deleteJob};
