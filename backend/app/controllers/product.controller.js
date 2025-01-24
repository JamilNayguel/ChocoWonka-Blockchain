const { request, response } = require('express');
const { Products } = require('../database/config');
const { Op } = require("sequelize");
const fs = require('fs');
const path = require('path');
const getProducts = async (req = request, res = response) => {
    try {
        const products = await Products.findAll({
            attributes: ['id', 'name', 'price', 'category_id','path'],
            
            order: [['id', 'ASC']],
        });

        if (products.length <= 0) {
            return res.status(404).json({
                ok: false,
                errors: [{ msg: 'No se encontraron productos' }],
            });
        }

        return res.status(200).json({
            ok: true,
            products
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: [{ msg: 'Ocurrió un imprevisto interno | hable con soporte' }],
        });
    }
};

const newProduct = async (req = request, res = response) => {
    try {
        const body = req.body;
        body.status = true;
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                errors: [{ msg: 'No se subió ningún archivo' }],
            });
        }
        body.ex_file = path.extname(req.file.originalname).slice(1);

        const fileName = `${Date.now()}-${req.file.originalname}`;
        const filePath = path.join(__dirname, '../uploads', fileName);

        fs.writeFileSync(filePath, req.file.buffer);

        body.path = fileName;

        const productNew = await Products.create(body);

        return res.status(201).json({
            ok: true,
            productNew
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: [{ msg: 'Ocurrió un imprevisto interno | hable con soporte' }],
        });
    }
};

const updateProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const productUpdate = await Products.findByPk(id);

        if (!productUpdate) {
            return res.status(404).json({
                ok: false,
                errors: [{ msg: 'Producto no encontrado' }],
            });
        }
        if (req.file) {
            
            if (productUpdate.path) {
                const oldFilePath = path.join(__dirname, '../uploads', productUpdate.path);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            body.ex_file = path.extname(req.file.originalname).slice(1);
            const fileName = `${Date.now()}-${req.file.originalname}`;
            const filePath = path.join(__dirname, '../uploads', fileName);
            body.path = fileName;

            fs.writeFileSync(filePath, req.file.buffer);
        }

        await productUpdate.update({
            ...body,  
        });

        return res.status(200).json({
            ok: true,
            productUpdate
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
    getProducts,
    newProduct,
    updateProduct
};
