import mongoose ,{Schema, models} from 'mongoose'

const messageSchema=new Schema({
    roomName:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    },
    isWhiteSide:{
        type:Boolean,
        required:true
    }
   
},{timestamps:true})

const Message = models?.Message || mongoose.model('Message',messageSchema)
export default Message