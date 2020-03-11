import {connect} from 'mongoose';


export async function startConnection(){

  const db =   await connect('mongodb://localhost/photo-gallery-db', {
            useNewUrlParser: true
    });
    console.log('Database is connected')

}

