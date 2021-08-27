import { Router } from "express";
import {greeting} from '../controllers/photo.controller';
const router = Router();



router.get('/',greeting);



export default router;