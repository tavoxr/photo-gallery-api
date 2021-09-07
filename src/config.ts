import {config} from 'dotenv';

config();

export default {
    mongodbURI: process.env.MONGODB_URI,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsRegion: process.env.AWS_BUCKET_REGION,

}