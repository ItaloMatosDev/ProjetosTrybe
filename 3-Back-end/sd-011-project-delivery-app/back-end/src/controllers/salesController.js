const salesServices = require('../services/salesService');

const createSale = async (req, res) => {
  const dataSale = req.body;
  const sale = await salesServices.createSale(dataSale);

  res.status(201).json(sale);
};

const listSales = async (req, res) => {
  const sales = await salesServices.listSales();

  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getSale(id);

  res.status(200).json(sale);
};

module.exports = {
  createSale,
  listSales,
  getSaleById,
};