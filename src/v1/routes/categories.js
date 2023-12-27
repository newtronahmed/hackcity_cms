const express = require('express')
const categoryController = require('../../controllers/categoryController');
const validateObjectId = require('../../middleware/validateObjectId');


const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAllCategories); 

categoryRouter.get('/:id', validateObjectId, categoryController.getOneCategory); 

categoryRouter.post('/', categoryController.createNewCategory); 

categoryRouter.patch('/:id', validateObjectId, categoryController.updateOneCategory); 
categoryRouter.delete('/:id', validateObjectId, categoryController.deleteOneCategory); 


module.exports = categoryRouter;