const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, isSeller } = require('../middleware/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

router.use(protect); // Protect all routes below this middleware

router.post('/',isSeller, productController.createProduct);
router.patch('/:id', isSeller, productController.updateProduct);
router.delete('/:id', isSeller, productController.deleteProduct);

module.exports = router; 