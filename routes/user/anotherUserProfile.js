var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serAnotherUserProfile');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

/* 다른 유저 ID 조회 comment 반환 */
router.get('/:id', wrapper(async function (req, res) {
        userDIV = req.params.id;
        const userComment = await db.anotherPage(userDIV);
        return res.send(userComment[0]);
    }
));

/* 다른 유저 ID 조회 프로필 사진, 닉네임, 가입 날짜 반환 */
router.get('/:id/profile', wrapper(async function (req, res) {
    userDIV = req.params.id;
    const userComment = await db.anotherProfile(userDIV);
    return res.send(userComment[0]);
}
));

/* 다른 유저 ID 조회 올린 프로젝트 정보 반환 */
router.get('/:id/upload', wrapper(async function (req, res) {
        userDIV = req.params.id;
        const upLoadProject = await db.anotherUploadProject(userDIV);
        return res.send(upLoadProject);
    }
));

/* 다른 유저 ID 조회 구매한 프로젝트 정보 반환 */
router.get('/:id/buy', wrapper(async function (req, res) {
        userDIV = req.params.id;
        const buyProject = await db.anotherBuyProject(userDIV);
        return res.send(buyProject);
    }
));

module.exports = router;
