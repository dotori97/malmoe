const dictionaryService = require("../services/dictionaryService");

const postTypeBranch = (req, res) => {
  const { type } = req.params; // 경로 매개변수 "type" 추출
  console.log("Controller postTypeBranch type = ", type);
  switch (type) {
    case "1":
      findWordByEmail(req, res);
      break;

    case "2":
      findAllbyCategory(req, res);
      break;

    case "3":
      createDictionary(req, res);
      break;

    default:
      console.log("입력된 Type 값이 올바르지 않습니다.");
      break;
  }
};

const upsertDictionary = async (req, res) => {
  const { word, des, des_json, c_id, memo, url, input_type } = req.body;
  const email = req.user.email;

  if (!word || !email) {
    return res.status(400).json({ message: "Word & Email are required." });
  }

  try {
    const [result, created] = await dictionaryService.upsertDictionary({
      email,
      word,
      des,
      des_json,
      c_id,
      memo,
      url,
      input_type,
    });

    if (created) {
      return res
        .status(201)
        .json({ message: "Word created successfully.", data: word });
    }
    return res
      .status(200)
      .json({ message: "Word updated successfully.", data: word });
  } catch (e) {
    console.error("Error in createOrUpdateWord:", e);
    return res
      .status(500)
      .json({ message: "CreateOrUpdateWord.", error: e.message });
  }

  console.log("upsertDictionary Result >>>>>", result);
};

const createDictionary = async (req, res) => {
  const { word, des, des_json, c_id, memo, url, input_type } = req.body;
  const email = req.user.email;
  console.log(">>>>>>> email data 검증", email);

  if (!word || !email) {
    return res.status(400).json({ message: "Word & Email are required." });
  }

  try {
    const dictionary = await dictionaryService.createDictionary({
      email: email,
      word: word,
      des: des,
      des_json: des_json,
      c_id: parseInt(c_id),
      memo: memo,
      url: url,
      input_type: parseInt(input_type),
    });
    return res
      .status(200)
      .json({ message: "Word inserted successfully.", data: word });
  } catch (e) {
    console.error("Error in createWord:", e);
    return res.status(500).json({ message: "CreateWord.", error: e.message });
  }
};

const findWordByEmail = async (req, res) => {
  const { word } = req.body;
  const email = req.user.email;
  console.log("Controller.findWordByEmail >>>>", email);

  if (!word || !email) {
    return res.status(400).json({ message: "Word & Email are required." });
  }

  try {
    const dictionary = await dictionaryService.findWordByEmail(email, word);

    if (!dictionary) {
      return res.status(404).json({
        message: `No entry found for email: ${email} and word: ${word}`,
      });
    }
    res.status(200).json({ message: "Fetch word success", data: dictionary });
  } catch (e) {
    console.error("Error fetching word:", e);
    res.status(500).json({ message: "Fetch word error", error: e.message });
  }
};

const findAllbyCategory = async (req, res) => {
  const { c_id, id } = req.body;
  const email = req.user.email;

  try {
    const dictionarys = await dictionaryService.findAllbyCategory(
      email,
      c_id,
      id
    );
    res
      .status(200)
      .json({ message: "Fetch dictionarys success", data: dictionarys });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Fetch dictionarys error", data: e.message });
  }
};

const deleteDictionary = async (req, res) => {
  try {
    const id = req.params.id;
    const word = await dictionaryService.deleteDictionary(id);
    console.log("Controller : deleteDictionary dictionary >>>>>");
    res.status(204).json({ message: "delete word success" });
  } catch (e) {
    res.status(500).json({ message: "delete word error", data: e.message });
  }
};

module.exports = {
  upsertDictionary,
  createDictionary,
  findWordByEmail,
  findAllbyCategory,
  deleteDictionary,
  postTypeBranch,
};
