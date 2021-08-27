import {Schema, model, Document } from 'mongoose';


const PhotoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    imageUrl:{
        type: String,
        required: true
    }

},{
    versionKey: false,
    timestamps: true
});


interface IPhoto extends Document{
    title: string;
    description: string;
    imageUrl: string;
}


export default  model<IPhoto>('Photo', PhotoSchema);
