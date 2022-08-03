var express = require('express');
var router = express.Router();
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;
const multer = require('multer')
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

let corsOption = {
    origin : "*",
    credential : true,
};

app.use(cors(corsOption))

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb("../")
    },
    filename : function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext);
    },
});

const upload = multer({
    storage : storage
})

router.post('/', upload.single('img'), async(req, res)=> {
    const image= req.file.path;
    console.log(req.file);
    if(image === undefined){
        return res.send("이미지없음");
    }
    res.send("성공! ><");
})


module.exports = router;