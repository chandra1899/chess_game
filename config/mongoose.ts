const mongoose = require('mongoose');
//connecting to mongoDB
export const connectMongoDB=()=>{
    mongoose.connect(process.env.MONGODB_URL);

    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
    
    
    db.once('open', function(){
        console.log('Connected to Database :: MongoDB');
    });
}

