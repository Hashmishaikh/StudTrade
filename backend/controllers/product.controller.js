const Product = require('../models/product.model');

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create({
            ...req.body,
            seller: req.user._id
        });

        res.status(201).json({
            status: 'success',
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate('seller', 'name email')
            .sort('-createdAt');

        res.json({
            status: 'success',
            results: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('seller', 'name email');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({
            status: 'success',
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, seller: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        res.json({
            status: 'success',
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            seller: req.user._id
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        res.json({
            status: 'success',
            message: 'Product deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}; 