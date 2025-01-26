const Block = require('./Block');
const Transaction = require('./Transaction');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; // Nivel de dificultad para PoW
        this.pendingTransactions = [];
        this.miningReward = 50; // Recompensa por minar un bloque
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    createNewTransaction({ sender, recipient, amount }) {
        const transaction = new Transaction(sender, recipient, amount);
        this.addTransaction(transaction); // Añade la transacción a las pendientes
        return transaction;
    }

    minePendingTransactions(minerAddress) {
        const block = new Block(
            this.chain.length,
            Date.now(),
            this.pendingTransactions,
            this.getLatestBlock().hash
        );
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined:', block.hash);
        this.chain.push(block);

        // Recompensa al minero
        this.pendingTransactions = [new Transaction(null, minerAddress, this.miningReward)];
    }
    
    addTransaction(transaction) {
        if (!transaction.sender || !transaction.recipient) {
            throw new Error('Transaction must include sender and recipient');
        }
        if (transaction.amount <= 0) {
            throw new Error('Transaction amount must be greater than zero');
        }
    
    
        this.pendingTransactions.push(transaction);
    }
    

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
    toJSON() {
        return {
            chain: this.chain.map(block => block.toJSON()),
            pendingTransactions: this.pendingTransactions.map(tx => tx.toJSON()),
            difficulty: this.difficulty,
            miningReward: this.miningReward,
        };
    }
}

module.exports = Blockchain;
