'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Orders extends Model {
    static associate(models) {
      

      Orders.hasMany(models.OrderItems, {
        foreignKey: 'order_id',
        as: 'orderItems',
      });
    }
  }

  Orders.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50), // Ejemplo: 'pending', 'completed', 'cancelled'
      defaultValue: 'pending',
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Orders',
    tableName: 'orders',
  });

  return Orders;
};
