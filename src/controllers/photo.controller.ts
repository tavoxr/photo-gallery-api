import {Request,Response} from 'express';



export function getPhoto (req: Request, res: Response){

}



export function createPhoto (req: Request,res: Response): Response{

    console.log('saving photo')
    console.log(req.body)

    return res.json({
        message: 'Photo successfully saved'
    })
}