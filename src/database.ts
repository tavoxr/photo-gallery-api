import mongoose from 'mongoose';
import config from './config';


const dbConexion = async ()=>{

    try{
        await mongoose.connect(`${config.mongodbURI}`);

    }catch(error){
        console.log(error);
    }

}


dbConexion();

const db =  mongoose.connection;

db.once('open',()=>{
    console.log("Database connected to: ", config.mongodbURI);
})

