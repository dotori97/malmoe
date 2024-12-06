const models = require('../models');

const findUserByEmail = async (email) => {
    // console.log(`userDao.js 4line ${email}`)
    return await models.User.findOne({
        where : {email: email}
    });
}

const updateUserByEmail = async (email, userData) => {   
    // console.log(`userDao.js 11line ${userData}`) 
    return await models.User.update({
        ...userData, // 기존 데이터 포함
        u_date: new Date() // 현재 일시 추가
    }, {
        where : {email} 
    });    
}

const deleteUserByEmail = async (email) => {
    // console.log(`userDao.js 21line ${email}`) 
    return await models.User.destroy({
        where : {email}
    });
}

const createUser = async (userData) =>{
    // console.log(' test >>>>>>>>>>>>>.', userData    );
    return await models.User.create(userData);
}

const createLogin = async (email) =>{
    // console.log(' userDao.js 33line ', email);
    return await models.Login.create({email});
}

module.exports = { 
    findUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
    createUser,
    createLogin,
} 