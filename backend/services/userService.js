const userDao = require('../dao/userDao');

const findUserByEmail = async(email) => {
    return await userDao.findUserByEmail(email);
}

const findUserByEmail2 = async(email) => {
    const result = await userDao.findUserByEmail(email);

    await userDao.createLogin(email);
    
    return result
}

const updateUserByEmail = async(email, userData) => {
    return await userDao.updateUserByEmail(email, userData);
}

const deleteUserByEmail = async(email) => {
    return await userDao.deleteUserByEmail(email);
}

const createUser = async(userData) => {
    const {name, pw, email} = userData;

    // pw = hashpw;
    return await userDao.createUser(userData);
} 

module.exports = { 
    findUserByEmail,
    findUserByEmail2,
    updateUserByEmail,
    deleteUserByEmail,
    createUser, 
}