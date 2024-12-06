const levelDao = require('../dao/levelDao');

const findLevelByCategory = async(c_id, limit) => {
    // console.log(`levelService.js 4line c_id:${c_id}, limit:${limit} `)
    if (!c_id || !limit) {
        throw new Error('c_id and limit are required');
    }
    const parsedLimit = parseInt(limit, 10);
    return await levelDao.findLevelByCategory(c_id, parsedLimit);
}

const findLevelByEmail = async(email) => {
    if (!email) {
        throw new Error('email are required');
    } 
    return await levelDao.findLevelByEmail(email);
}

const updateLevelById = async(id, level) => {
    // console.log(`levelservice.js 8line id:${id}, level:${level}`)
    // if (!id || level === undefined || level === null) {
    //     console.error('Error during update levelServices.js:');
    //     throw new Error('Invalid id or level');
    // }
    return await levelDao.updateLevelById(id, Number(level));
}

module.exports = {
    findLevelByCategory,
    findLevelByEmail,
    updateLevelById,
}