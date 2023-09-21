import mongoose ,{Schema, models} from 'mongoose'

const gameSchema=new Schema({
    roomName:{
        type:String,
        required:true
    },
    white:{
        type:String,
        required:true
    },
    black:{
        type:String,
    },
    gameStatus:{
        type:String,
        enum:['gameOver','draw','running'],
        default:'running'
    },
    won:{
        type:String,
    },
    whiteDisconnected:{
        type:Number,
    },
    blackDisconnected:{
        type:Number,
    },
    checkWhiteToBlack:{
        type:Number,
        default:0
    },
    checkBlackToWhite:{
        type:Number,
        default:0
    },
},{timestamps:true})

const Game = models?.Game || mongoose.model('Game',gameSchema)
export default Game