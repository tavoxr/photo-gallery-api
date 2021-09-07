import { Request, Response } from 'express';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';
import { s3 } from '../libs/s3';

export const getPhotos = async (req: Request, res: Response): Promise<Response> => {

    try {
        const photos = await Photo.find();
        return res.json(photos);

    } catch (error) {
        return res.status(500).json({ message: error || "Something goes wrong retrieving photos" })
    }
}


export const createPhoto = async (req: Request, res: Response): Promise<Response> => {

    let fileMulter = (req as any).file;
    console.log('fileMulter', fileMulter);
    console.log('fieldname', fileMulter.location);
    try {

        const { title, description } = req.body;
        const imageUrl = fileMulter.location;
        const fileS3Key = fileMulter.key;
        console.log('file', req.file);
        console.log('filePath', req.file?.path);
        console.log(req.body)

        const newPhoto = new Photo({
            title,
            description,
            imageUrl,
            fileS3Key
        })

        console.log('photo',newPhoto);
        const photoSaved = await newPhoto.save();

        return res.status(201).json({ message: "Photo successfully saved", photoSaved, file: req.file })

    } catch (error) {
        return res.status(500).json({ message: error || "Something goes wrong uploading a new photo" })
    }

}

export const getPhoto = async (req: Request, res: Response): Promise<Response> => {

    try {
        const id = req.params.id;
        const photo = await Photo.findById({ _id: id });
        console.log('photo', photo)
        return res.status(200).json(photo);

    } catch (error) {
        return res.status(500).json({ message: error || "Something goes wrong retrieving the photo" })
    }
}


export const updatePhoto = async (req: Request, res: Response): Promise<Response> => {

    try {
        const id = req.params.id;
        const { title, description } = req.body;
        const photo = await Photo.findByIdAndUpdate({ _id: id }, { title, description });

        return res.status(200).json(photo);

    } catch (error) {
        return res.status(500).json({ message: error || "Something goes wrong updating the photo" })
    }

}



export const deletePhoto = async (req: Request, res: Response): Promise<Response> => {

    try {
        const id = req.params.id;

        const photo = await Photo.findByIdAndRemove({ _id: id });

        if (photo) {
            try {
                //await fs.unlink(path.resolve(photo.imageUrl));
                s3.deleteObject(
                    {   Bucket: 'angular-photo-gallery', 
                        Key: photo.fileS3Key
                    }, 
                    (err, data)=> {
                        console.error(err);
                        console.log(data);
               });

            } catch (error) {
                res.json({ message: error });
            }
        }

        return res.status(200).json({ message: "Photo successfully deleted ", photo });

    } catch (error) {
        return res.status(500).json({ message: error || "Something goes wrong retrieving the photo" })
    }




    

}