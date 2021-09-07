import { Router } from "express";
import {createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto} from '../controllers/photo.controller';
import multer from  '../libs/multer';
import {uploadS3} from "../libs/s3";

const router = Router();

router.get('/', getPhotos);

router.post('/', uploadS3.single('image'), createPhoto);

router.get('/:id', getPhoto);
router.put('/:id', updatePhoto);

router.delete('/:id', deletePhoto);


export default router;