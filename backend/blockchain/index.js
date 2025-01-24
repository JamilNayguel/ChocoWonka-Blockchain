const Blockchain = require('./Blockchain'); 
const Transaction = require('./Transaction');

const myBlockchain = new Blockchain();

// Crear nuevas transacciones
const tx1 = new Transaction(100, 'Alice', 'Bob');

// Agregar transacciones a la blockchain
myBlockchain.addTransaction(tx1);

// Minar las transacciones pendientes
myBlockchain.minePendingTransactions('minerAddress'); // Reemplaza 'minerAddress' con la dirección del minero

// Mostrar la cadena de bloques sin referencias circulares
console.log(JSON.stringify(myBlockchain.toJSON(), null, 4));

module.exports = {
    myBlockchain
};
