const models = require('../models');
const { sequelize } = require('../models'); // 트랜잭션에 필요

const createCategory = async (categoryData) => {
    return await models.Category.create(categoryData);
} // insert category ... values ... 

const updateCategory = async (c_id, userData) => {
    return await models.Category.update(
        userData,
        {
        where : {c_id: c_id},
    }); // update category set .... where c_id = c_id
}

// const deleteCategoryById = async (c_id) => {
//     return await models.Category.destroy({
//         where : {c_id: c_id}
//     }); // delete from category where c_id = c_id
// }

const findCategoryByEmail = async (email) => {
    // console.log(`levelDao.js 4line id:${c_id}, limit:${limit}`);
    const query = `  
        SELECT a.email, a.c_id, a.c_name, count(*) word_cnt
        FROM categorys a 
        left outer join dictionarys b
        on a.email = b.email
        and a.c_id = b.c_id 
        WHERE a.email = :email
        group by a.email, a.c_id, a.c_name;
    `;
    // console.log(`levelDao.js 12line query:${query}`);
    return await models.sequelize.query(query, {
        type: models.Sequelize.QueryTypes.SELECT,
        replacements: { email },
    });
};

const deleteCategoryByEmail = async (email) => {
    return await models.Category.destroy({
        where : {email: email}
    }); // delete from category where email = email
}

const deleteDictionaryById = async (c_id) => {
    return await models.Dictionary.destroy({
        where : {c_id: c_id}
    }); // delete from category where email = email
}

const findCategoryById = async (c_id) => {
    return await models.Category.findOne({
        where : {c_id: c_id}
    }); // select * from category where c_id = c_id
}

// const findCategoryByEmail = async (email) => {
//     return await models.Category.findAll({
//         where : {email: email}
//     }); // select * from category where email = email
// }

const deleteCategoryById = async (c_id) => {
    const transaction = await sequelize.transaction(); // 트랜잭션 시작

    try {
        //사전에 해당 카테고리와 연관된 단어 삭제
        await models.Dictionary.destroy({
            where: { c_id: c_id },
            transaction, // 트랜잭션 사용
        });

        //카테고리 삭제
        await models.Category.destroy({
            where: { c_id: c_id },
            transaction, // 트랜잭션 사용
        });

        await transaction.commit(); // 성공적으로 모든 작업 완료
        return true;
    } catch (error) {
        await transaction.rollback(); // 실패 시 롤백
        console.error("Error in deleteCategoryById:", error);
        throw error;
    }
};


module.exports = { 
    createCategory,
    updateCategory,
    deleteCategoryById,
    deleteCategoryByEmail,
    findCategoryById,
    findCategoryByEmail,
    deleteDictionaryById,
}