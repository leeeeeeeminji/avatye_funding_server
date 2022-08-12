const jwt = require('jsonwebtoken');
const wrap = require('../util/wrapper');
const wrapper = wrap.wrapper;
const secret = 'hwan'

// 토큰 검증
async function verifyToken(token){
    try{
        decodeToken = jwt.verify(token,secret);
        return decodeToken;
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            return {
                code:419,
                massage: '토큰이 만료되었습니다.'
            }
        }
        return {
            code: 401,
            massage: '유효하지 않은 토큰입니다.'
        }
    }
}

module.exports = {
    verifyToken,
}