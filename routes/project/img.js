var express = require('express');
var router = express.Router();
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
aws.config.loadFromPath("/Users/newt/avatye_funding_server/s3.json");

let corsOption = {
    origin : "*",
    credential : true,
};

app.use(cors(corsOption))

const s3 = new aws.S3();
const upload = multer({
    storage : multerS3({
        s3 : s3,
        bucket : "avaimage",
        acl : "public-read",
        contentType : multerS3.AUTO_CONTENT_TYPE,
        key : function(req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

router.post('/', upload.single('img'), async(req, res)=> {
    const image= req.file.location

    if(image === undefined){
        return res.send("이미지없음");
    }
    res.send(image);
})

module.exports = router;