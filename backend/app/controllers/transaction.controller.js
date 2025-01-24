const { request, response } = require('express');
const { Transactions } = require('../database/config');
const { Op } = require("sequelize");

const getTransactions = async (req = request, res = response) => {
    try {
        const transactions = await Transactions.findAll({
            attributes: ['id', 'transaction_hash', 'status', 'amount'],
            order: [['id', 'ASC']],
        });

        if (transactions.length <= 0) {
            return res.status(404).json({
                ok: false,
                errors: [{ msg: 'No se encontraron Transacciones' }],
            });
        }

        return res.status(200).json({
            ok: true,
            transactions
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: [{ msg: 'Ocurrió un imprevisto interno | hable con soporte' }],
        });
    }
};

module.exports = {
    getTransactions
};