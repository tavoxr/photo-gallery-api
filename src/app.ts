import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import path from 'path';
import cors from 'cors';

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use('/api/photos', indexRoutes);


// this folder will store public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;
