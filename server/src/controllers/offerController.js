const Offer = require('../models/Offer');

const getOffers = async (_req, res) => {
  const offers = await Offer.find().sort({ createdAt: -1 });
  res.json(offers);
};

const createOffer = async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(201).json(offer);
};

module.exports = { getOffers, createOffer };
