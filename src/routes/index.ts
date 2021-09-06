import { Router } from "express";
import {createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto} from '../controllers/photo.controller';
import multer from  '../libs/multer';
const router = Router();

router.get('/', getPhotos);

router.post('/', multer.single('image'), createPhoto);

router.get('/:id', getPhoto);
router.put('/:id', updatePhoto);

router.delete('/:id', deletePhoto);


export default router;