const { request, response } = require('express');
const { Categories } = require('../database/config');
const { Op } = require("sequelize");

const getCategories = async (req = request, res = response) => {
    try {
        const categories = await Categories.findAll({
            attributes: ['id', 'name'],
            
            order: [['id', 'ASC']],
        });

        if (categories.length <= 0) {
            return res.status(404).json({
                ok: false,
                errors: [{ msg: 'No se encontraron categorías' }],
            });
        }

        return res.status(200).json({
            ok: true,
            categories
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: [{ msg: 'Ocurrió un imprevisto interno | hable con soporte' }],
        });
    }
};

const newCategory = async (req = request, res = response) => {
    try {
        const body = req.body;
        body.status = true;
        const categoryNew = await Categories.create(body);

        return res.status(201).json({
            ok: true,
            categoryNew
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: [{ msg: 'Ocurrió un imprevisto interno | hable con soporte' }],
        });
    }
};

const updateCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const categoryUpdate = await Categories.findByPk(id);

        if (!categoryUpdate) {
            return res.status(404).json({
                ok: false,
                errors: [{ msg: 'Categoría no encontrada' }],
            });
        }

        await categoryUpdate.update(body);

        return res.status(200).json({
            ok: true,
            categoryUpdate
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
    getCategories,
    newCategory,
    updateCategory
};
