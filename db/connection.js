import mongoose from 'mongoose';

 //const connectionS='mongodb+srv://Tabish:123@cluster0.zqadxwa.mongodb.net/03-Task-Manager?retryWrites=true&w=majority'

const connectDb=(url)=>{
    return mongoose.connect(url).then(()=>console.log('Connected to db')).catch((err)=>console.log(err))
}

export default connectDb
//mongoose.connect(connectionString).then(()=>console.log('Connected to db')).catch((err)=>console.log(err))