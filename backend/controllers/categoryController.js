const categoryService = require('../services/categoryService');
const {validationResult} = require('express-validator'); // added

const createCategory = async (req, res) => {    
    const data = req.body;
    try{
        const errors = validationResult(req); // added 
        if(!errors.isEmpty()){ // added
            return res.status(400).json({errors: errors.array().map(e=>e.msg)});
        } // added
        const newCategory = await categoryService.createCategory(data);
        res.status(201).json({data:newCategory, message:'ok'});
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

const findCategoryByEmail = async (req, res) => {
    const email = req.params.email;
    //const user = req.user;
    // console.log(`categorycontroller.js 21line ${email}`)
    try{
        const categories = await categoryService.findCategoryByEmail(email); 
        // console.log(`categorycontroller.js 24line ${categories}`)
        // res.status(200).json({data: categories, message:'ok'});
        res.status(200).json({categories});
    }catch(e){
        res.status(500).json({message: e});
    }
}

const findCategoryById = async (req, res) => {
    const {c_id} = req.params;
    try{
        const categories = await categoryService.findCategoryById(c_id);
        res.status(200).json({data: categories, message:'ok'});
    }catch(e){
        res.status(500).json({message: e});
    }
}

const deleteCategoryByEmail = async (req, res) => {
    const {email} = req.params;
    try{
        const categories = await categoryService.deleteCategoryByEmail(email); 
        res.status(200).json({data: categories, message:'ok'});
    }catch(e){
        res.status(500).json({message: e});
    }
}

const deleteCategoryById = async (req, res) => {
    const {c_id} = req.params;
    try{
        const categories = await categoryService.deleteCategoryById(c_id); 
        res.status(200).json({data: categories, message:'ok'});
    }catch(e){
        res.status(500).json({message: e});
    }
}

const updateCategory = async (req, res) => {
    
    try{
        const {c_id, c_name, email} = req.body;
        if(!c_id){
            return res.status(400).json({message: "Category ID is required"});
        }
        const errors = validationResult(req); // added 
        if(!errors.isEmpty()){ // added
            return res.status(400).json({errors: errors.array().map(e=>e.msg)});
        } // added
        const category = await categoryService.updateCategory(c_id, {c_name, email});
        res.status(201).json({data:category, message:'ok'});
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

module.exports = {
    createCategory,
    updateCategory, 
    findCategoryById,
    findCategoryByEmail,
    deleteCategoryById,
    deleteCategoryByEmail,
}
