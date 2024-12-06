const models = require("../models");
const Sequelize = require("sequelize");

//테이블 변경으로 (id pk 추가) 해당 메소드는 사용 안함
const upsertDictionary = async (data) => {
  try {
    const result = await models.Dictionary.upsert(data, {
      returning: true, // 업데이트된 데이터를 반환받기 위해 추가
    });
    return result; // [result: Instance, created: boolean]
  } catch (error) {
    console.error("Error in upsertWord service:", error);
    throw new Error("Database upsert operation failed");
  }
};

//말입력 신규
const createDictionary = async (data) => {
  try {
    // console.log('Insert Query:', query, 'Data:', dictionaryData);
    // console.log('DB Connection:', db.config); // db.config이 실제로 사용 중인지 확인
    console.log('createDictionary',data);
    return await models.Dictionary.create(data);
  } catch (error) {
    console.log(">>>>>>> Error insert word", error);
    // console.log('Insert Query:', query, 'Data:', dictionaryData);
    throw new Error(">>>>>>> Database insert operation failed");
  }
};

//말입력 수정
const updateDictionary = async (email, word, data) => {
  try {
    return await models.Dictionary.update(data, {
      where: {
        email: email,
        word: word,
      },
    });
  } catch (error) {
    console.log(">>>>>>> Error update word", error);
    throw error;
  }
};

//말입력 조회
const findWordByEmail = async (email, word) => {
  try {
    const dictionary = await models.Dictionary.findOne({
      // return await models.Dictionary.findOne({
      where: {
        email: email,
        word: word,
      },
    });
    console.log(">>>>>>> findWordByEmail >>>>>>>", dictionary);
    return dictionary;
  } catch (error) {
    console.log(">>>>>>> Error fetching data by word", error);
    throw error;
  }
};

//사전 화면을 위한 각 개인의 카테고리별 단어 전체 조회
const findAllbyCategory = async (email, c_id, id) => {
  try {
    return await models.Dictionary.findAll({
      attributes: [
        [Sequelize.literal("ROW_NUMBER() OVER (ORDER BY id DESC)"), "rowNum"],
        "id",
        "word",
        [
          Sequelize.literal("TO_CHAR(c_date, 'YYYY-MM-DD HH24:MI:SS')"),
          "c_date",
        ],
        // "c_date",
        "memo",
        "level",
        "des",
        // [Op.fn("COUNT", col("id")), "totalnum"],
      ],
      where: {
        email: email,
        c_id: c_id,
        // id { [gt]: id, },
      },
    });
  } catch (error) {
    console.log(">>>>>>> Error fetching datas by category", error);
    throw error;
  }
};

const deleteDictionary = async (id) => {
  try {
    return await models.Dictionary.destroy({
      where: { id },
    });
  } catch (error) {
    console.log("Error delete data by word", error);
    throw error;
  }
};

module.exports = {
  upsertDictionary,
  createDictionary,
  updateDictionary,
  findWordByEmail,
  findAllbyCategory,
  deleteDictionary,
};
