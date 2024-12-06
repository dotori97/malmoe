const models = require('../models');

const findLevelByCategory = async (c_id, limit) => {
    // console.log(`levelDao.js 4line id:${c_id}, limit:${limit}`);
    const query = `  
        SELECT id, email, word, des, des_json, level
        FROM dictionarys
        WHERE c_id = :c_id
        and level <> 0 
        LIMIT :limit;
    `;
    // console.log(`levelDao.js 12line query:${query}`);
    return await models.sequelize.query(query, {
        type: models.Sequelize.QueryTypes.SELECT,
        replacements: { c_id, limit },
    });
};

const findLevelByEmail = async (email) => {
    // console.log(`levelDao.js 4line id:${c_id}, limit:${limit}`);
    const query = `  
        SELECT count(*) total_cnt, sum(case level when 0 then 1 else 0 end) complete_cnt
        FROM dictionarys a 
        WHERE email = :email;
    `;
    // console.log(`levelDao.js 12line query:${query}`);
    return await models.sequelize.query(query, {
        type: models.Sequelize.QueryTypes.SELECT,
        replacements: { email },
    });
};

const updateLevelById = async (id, level) => {
    try {
        // console.log(`levelDao.js 21line id:${id}, level:${level}`);
    
        const result = await models.Dictionary.update(
        { level: level,
          u_date: new Date() // 현재 일시 추가
         }, // Update level column
        { where: { id: Number(id) } } // Match id
        );
        return result; // Returns the number of updated rows
    } catch (e) {
       //  throw error; // Handle errors in service/controller layer
        console.error('Error during update levelDao.js:', e.message);
        res.status(500).json({message: e.message});
    }
};

module.exports = {
    updateLevelById,
    findLevelByCategory, 
    findLevelByEmail,
} 