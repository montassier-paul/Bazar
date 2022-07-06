const multer = require('multer')       
const Aws = require('aws-sdk') 
require("dotenv/config")    



const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

// below variable is define to check the type of file which is uploaded

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter });

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
}); 


exports.storage = storage;
exports.filefilter = filefilter;
exports.upload = upload;
exports.s3 = s3;