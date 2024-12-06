const { validationResult } = require('express-validator');
const levelService = require('../services/levelService');

const findLevelByCategory = async(req, res) => {    
    const { c_id, limit } = req.query; 
    if (!c_id) {
        return res.status(400).json({ message: 'Category는 항상 선택되어야 합니다. levelController.js 7line' });
    }

    // 필요에 따라 c_id와 limit를 정수로 변환
    //const parsedLimit = parseInt(limit, 10);
    
    try{
        // console.log(`levelController.js 14line c_id:${c_id}, limit:${limit}`)

        const dictionarys = await levelService.findLevelByCategory(c_id, limit);
        
        if (!dictionarys) {
            return res.status(404).json({ message: 'Level not found levelController.js 19line' });
        }
        res.status(200).json({data: dictionarys, message:'ok'});
    }catch(e){
        console.error('Error fetching 23line levelController.js:', e.message);
        res.status(500).json({ message: 'Server error levelController.js 24line' });
    }
}

const findLevelByEmail = async(req, res) => {    
    // const email = req.params.email; 
    const user = req.user;
    // console.log(`levelcontroller.js 31line ${user.email}`)
    try{
        const dictionary = await levelService.findLevelByEmail(user.email);
        // console.log(`levelcontroller.js 31line ${json({dictionary})}`)
        if (!dictionary) {
            return res.status(404).json({ message: 'Level not found levelController.js 34line' });
        }
        res.status(200).json({data: dictionary, message:'ok'});
    }catch(e){
        console.error('Error fetching 38line levelController.js:', e.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateLevelByID = async(req, res) => { 
    try{
        const { id } = req.params; // `id` comes from the route
        const { level } = req.body; // `level` comes from the request body
        // console.log(`levelController.js 22line body${req.body}, id:${id}, level:${level}`)
        // const errors = validationResult(req);  
        // if(!errors.isEmpty()) {
        //     return res.status(400).json({error: errors.array().map(e=>e.msg)});
        // } 
        
        if (![10, 5, 0].includes(level)) {
            return res.status(400).json({ message: 'Level is required levelController.js 55line' });
        }
        const result = await levelService.updateLevelById(id, level);     
        res.status(200).json({data: result, message: 'ok'});        
    }catch(e){
       console.error('Error during update levelController.js 60line : ', e.message);
       res.status(500).json({message: e.message});
    }
}
 
module.exports = {
    updateLevelByID,
    findLevelByCategory, 
    findLevelByEmail,
}