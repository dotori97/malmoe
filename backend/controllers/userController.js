const { validationResult } = require('express-validator');
const userService = require('../services/userService');

const findUserByEmail = async(req, res) => {    
    // const {email} =req.params;  // req.params.email 값을 email 변수에 할당
    const user = req.user;
    // console.log(`userController.js 7line ${user.email}`);
    try{
        const users = await userService.findUserByEmail(user.email);
        res.status(200).json({data: users, message: 'ok'});
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

const updateUserByEmail = async(req, res) => {
    const userData = req.body;    
    const user = req.user;
    // console.log(`userController.js 19line ${user.email}`);
    try{
       const users = await userService.updateUserByEmail(user.email, userData);        
       res.status(200).json({data: users, message: 'ok'});        
    }catch(e){
        console.error('Error during update:', e.message);
        res.status(500).json({message: e.message});
    }
}

const deleteUserByEmail = async(req, res) => {
    const user = req.user;
    // console.log(`userController.js 31line ${user.email}`);
    try{
        await userService.deleteUserByEmail(user.email);
        res.status(200).json({message: 'User deleted successfully'})
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

module.exports = { 
    findUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
}