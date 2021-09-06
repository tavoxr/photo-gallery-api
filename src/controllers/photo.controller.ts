import { Request, Response } from 'express';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';

export const getPhotos = async (req: Request, res: Response): Promise<Response> => {

    try {
        const photos = await Photo.find();
        return res.json(photos);

    } catch (error) {
        return res.status(500).json({ message: error || "Something goes wrong retrieving photos" })
    }
}


export const createPhoto = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { title, description } = req.body;
        const imageUrl = req.file?.path;

        console.log(req.file?.path);
        console.log(req.body)

        const newPhoto = new Photo({
            title,
            description,
            imageUrl
        })

        const photoSaved = await newPhoto.save();

        return res.status(201).json({ message: "Photo successfully saved", photoSaved })

    } catch (error) {
        return res.status(500).json({ message: error || "Something goes wrong uploading a new photo" })
    }

}

export const getPhoto = async (req: Request, res: Response): Promise<Response> => {

    try {
        const id = req.params.id;
        const photo = await Photo.findById({ _id: id });

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
                await fs.unlink(path.resolve(photo.imageUrl));
            } catch (error) {
                res.json({ message: error });
            }
        }

        return res.status(200).json({ message: "Photo successfully deleted ", photo });

    } catch (error) {
        return res.status(500).json({ message: error || "Something goes wrong retrieving the photo" })
    }




    

}