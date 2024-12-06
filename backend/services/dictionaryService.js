const dictionaryDao = require("../dao/dictionaryDao");

const upsertDictionary = async (data) => {
  return await dictionaryDao.upsertDictionary(data);
};

const createDictionary = async (data) => {
  return await dictionaryDao.createDictionary(data);
};

const updateDictionary = async (email, word, data) => {
  return await dictionaryDao.updateDictionary(email, word, data);
};

const findWordByEmail = async (email, word) => {
  try {
    return await dictionaryDao.findWordByEmail(email, word);
  } catch (error) {
    console.error("fetchWordByEmail 오류:", error.message);
  }
};

const findAllbyCategory = async (email, c_id, id) => {
  return await dictionaryDao.findAllbyCategory(email, c_id, id);
};

const deleteDictionary = async (id) => {
  return await dictionaryDao.deleteDictionary(id);
};

module.exports = {
  upsertDictionary,
  createDictionary,
  updateDictionary,
  findWordByEmail,
  findAllbyCategory,
  deleteDictionary,
};
