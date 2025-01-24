const { response } = require('express');
const { sequelize,Orders, OrderItems, Transactions} = require('../database/config');
require('dotenv').config();

const nodemailer = require('nodemailer');
const { myBlockchain } = require('../../blockchain/index');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
        user: 'jhyssel2016@gmail.com',
        pass: 'ephs dbpr wmaj wbqh' // Reemplaza con la contraseña generada de aplicación
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (recipient, totalPrice) => {
    const mailOptions = {
        from: 'jhyssel2016@gmail.com',
        to: recipient,
        subject: 'Pago Confirmado',
        text: `Un nuevo pago se ha registrado en la Tienda ChocoWonka. El monto total de la compra es de ${totalPrice.toFixed(2)} Bs.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo: ', error);
    }
};

const createOrder = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { items, total_price } = req.body;

        const newOrder = await Orders.create(
            {
                total_price,
                status: 'pending',
            },
            { transaction }
        );

        for (const item of items) {
            await OrderItems.create(
                {
                    order_id: newOrder.id,
                    product_id: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                },
                { transaction }
            );
        }

        myBlockchain.createNewTransaction({
            sender: 'marianocortez2025@gmail.com',
            recipient: 'jhyssel2016@gmail.com',
            amount: total_price,
        });

        // Minar las transacciones y obtener el bloque más reciente
        myBlockchain.minePendingTransactions('marianocortez2025@gmail.com');
        const latestBlock = myBlockchain.getLatestBlock();

        // Usar el hash del bloque más reciente para la transacción
        await Transactions.create(
            {
                order_id: newOrder.id,
                transaction_hash: latestBlock.hash, // Asegúrate de que esto sea un string
                amount: total_price,
                status: 'accepted',
            },
            { transaction }
        );

        await transaction.commit();

        await sendEmail('marianocortez2025@gmail.com', total_price);

        return res.status(201).json({
            ok: true,
            order: newOrder,
            message: 'Order created successfully!',
        });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({
            ok: false,
            errors: [{ msg: 'Internal server error | please contact support' }],
        });
    }
};


const getOrders = async (req = request, res = response) => {
  try {
      const optionsDb = {
          attributes: ['status','total_price'],
          order: [['id', 'ASC']],
                      
      };
      let orders = await Orders.findAll(optionsDb); 
      if(orders.length<=0){
          return res.status(404).json({
              ok: false,
              errors: [{ msg: `No se pudo encontrar la propiedad`}],
          });
      }
      return res.status(200).json({
              ok: true,
              orders
          });
      
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          ok: false,
          errors: [{ msg: `Ocurrió un imprevisto interno | hable con soporte`}],
      });
  }
}

module.exports = {
    getOrders,
    createOrder
    
};