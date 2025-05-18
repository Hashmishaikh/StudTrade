const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect } = require('../middleware/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

router.use(protect); // Protect all routes below this middleware

router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router; 