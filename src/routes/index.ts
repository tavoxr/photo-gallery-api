import {Router} from 'express';
const router = Router();

import {createPhoto, getPhoto} from '../controllers/photo.controller';
import multer from '../libs/multer';

router.route('/photos')
    .post(multer.single('image'), createPhoto)
    .get(getPhoto)





export default router;