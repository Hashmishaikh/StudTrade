import Product from '../models/Product.js';

export const getUserListings = async (req, res) => {
  const listings = await Product.find({ seller: req.user._id });
  res.json(listings);
};