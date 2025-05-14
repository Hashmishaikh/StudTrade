import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate('seller', 'name email');
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('seller', 'name email');
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};

export const createProduct = async (req, res) => {
  const { title, description, price, category, image } = req.body;

  const product = new Product({
    title,
    description,
    price,
    category,
    image,
    seller: req.user._id,
  });

  const created = await product.save();
  res.status(201).json(created);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.seller.toString() === req.user._id.toString()) {
    const { title, description, price, category, image } = req.body;

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;

    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(403).json({ message: 'Not authorized to update this product' });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.seller.toString() === req.user._id.toString()) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(403).json({ message: 'Not authorized to delete this product' });
  }
};