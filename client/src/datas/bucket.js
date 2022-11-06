const awsConfig = require('../config/aws.config.json');

const aws = require('aws-sdk');

aws.config.update({
    region: awsConfig.REGION,
    accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: awsConfig.AWS_SECRET_KEY
})

const s3 = new aws.S3();

export const getObjectFromS3 = async (objectKey) => {
    try {
        if (objectKey.includes(awsConfig.BASE_URI)) {
            objectKey = objectKey.substring(awsConfig.BASE_URI.length, objectKey.length);
        }

        const params = {
            Bucket: awsConfig.BUCKET,
            Key: objectKey
        }


        const data = await s3.getObject(params).promise();


        return data.Body.toString('utf-8');
    } catch (e) {
        throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
}