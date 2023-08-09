import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Plz provide Company Name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'Plz provide Position'],
        maxlength:100

    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Plz provide User']

    }
},{timestamps:true})


export default mongoose.model('Job',JobSchema);