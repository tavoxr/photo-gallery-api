import {Request,Response} from 'express';

export function createPhoto (req: Request,res: Response): Response{

    

    return res.json({
        message: 'Photo successfully saved'
    })
}