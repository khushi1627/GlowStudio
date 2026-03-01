const Offer = require('../models/Offer');

const getOffers = async (_req, res) => {
  const offers = await Offer.find().sort({ createdAt: -1 });
  res.json(offers);
};

const createOffer = async (req, res) => {
  const offer = await Offer.create(req.body);
  res.status(201).json(offer);
};

const updateOffer = async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!offer) {
    return res.status(404).json({ message: 'Offer not found' });
  }

  return res.json(offer);
};

const deleteOffer = async (req, res) => {
  const offer = await Offer.findByIdAndDelete(req.params.id);

  if (!offer) {
    return res.status(404).json({ message: 'Offer not found' });
  }

  return res.status(204).send();
};

module.exports = { getOffers, createOffer, updateOffer, deleteOffer };
