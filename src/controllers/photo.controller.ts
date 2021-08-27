import {Request, Response} from 'express';

export const greeting = (req: Request, res: Response): Response =>{
    return   res.send('Hello World from controllers');
}