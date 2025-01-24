'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Transactions extends Model {
    static associate(models) {
      

      Transactions.belongsTo(models.Orders, {
        foreignKey: 'order_id',
        as: 'order',
      });
    }
  }

  Transactions.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    transaction_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50), // Ejemplo: 'pending', 'confirmed', 'failed'
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
    modelName: 'Transactions',
    tableName: 'transactions',
  });

  return Transactions;
};
