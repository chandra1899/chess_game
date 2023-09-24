import * as mongoose from "mongoose";
//connecting to mongoDB
export const connectMongoDB=()=>{
    mongoose.connect(process.env.MONGODB_URL as string);

    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
    
    
    db.once('open', function(){
        console.log('Connected to Database :: MongoDB');
    });
}

