import path from 'path';
import multer from 'multer';
import  multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import {v4 as uuid} from 'uuid'
import config from '../config';

export const s3 = new aws.S3({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
})



export  const uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'angular-photo-gallery',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, uuid() + path.extname(file.originalname))
      }
    })
  })

 