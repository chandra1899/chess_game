import mongoose ,{Schema, models} from 'mongoose'

const boardStateSchema=new Schema({
    roomName:{
        type:String,
        required:true
    },
    from:{
        type:Array,
        required:true
    },
    to:{
        type:Array,
        required:true
    },
    board:{
        type:[[String]],
        required:true
    },
    isWhiteSide:{
        type:Boolean,
        required:true
    }
},{timestamps:true})

const BoardState = models?.BoardState || mongoose.model('BoardState',boardStateSchema)
export default BoardState