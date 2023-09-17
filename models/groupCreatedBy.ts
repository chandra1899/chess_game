import mongoose ,{Schema, models} from 'mongoose'

const groupCreatedBySchema=new Schema({
    email:{
        type:String,
        required:true
    },
    roomName:{
        type:String,
        required:true
    }
   
},{timestamps:true})

const GroupCreatedBy = models?.GroupCreatedBy || mongoose.model('GroupCreatedBy',groupCreatedBySchema)
export default GroupCreatedBy