const crypto = require('crypto');

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(0, '0', '0'); // Crear bloque génesis
  }

  /**
   * Crear un nuevo bloque
   * @param {number} nonce - Número usado para la prueba de trabajo
   * @param {string} previousBlockHash - Hash del bloque anterior
   * @param {string} hash - Hash del bloque actual
   * @returns {Object} - El bloque recién creado
   */
  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      hash,
      previousBlockHash,
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }

  /**
   * Obtener el último bloque de la cadena
   * @returns {Object} - El último bloque
   */
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Crear una nueva transacción
   * @param {number} amount - Monto de la transacción
   * @param {string} sender - Dirección del remitente
   * @param {string} recipient - Dirección del destinatario
   * @returns {number} - Índice del bloque que contendrá esta transacción
   */
  createNewTransaction(amount, sender, recipient) {
    if (!amount || !sender || !recipient) {
      throw new Error('Faltan datos para la transacción.');
    }

    const newTransaction = {
      amount,
      sender,
      recipient,
      timestamp: Date.now(),
    };

    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock().index + 1; // Índice del bloque que almacenará la transacción
  }

  /**
   * Generar hash para un bloque
   * @param {string} previousBlockHash - Hash del bloque anterior
   * @param {Object} currentBlockData - Datos del bloque actual
   * @param {number} nonce - Número para prueba de trabajo
   * @returns {string} - Hash generado
   */
  hashBlock(previousBlockHash, currentBlockData, nonce) {
    const dataString = previousBlockHash + JSON.stringify(currentBlockData) + nonce;
    return crypto.createHash('sha256').update(dataString).digest('hex');
  }

  /**
   * Prueba de trabajo
   * @param {string} previousBlockHash - Hash del bloque anterior
   * @param {Object} currentBlockData - Datos del bloque actual
   * @returns {number} - Nonce válido
   */
  proofOfWork(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

    while (hash.substring(0, 4) !== '0000') {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
  }

  /**
   * Verificar la validez de la cadena de bloques
   * @param {Array} chain - Cadena de bloques
   * @returns {boolean} - True si es válida, false si no lo es
   */
  isChainValid(chain) {
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i - 1];

      // Validar el hash del bloque
      const blockHash = this.hashBlock(
        previousBlock.hash,
        {
          transactions: currentBlock.transactions,
          index: currentBlock.index,
        },
        currentBlock.nonce
      );

      if (blockHash.substring(0, 4) !== '0000') return false;
      if (currentBlock.previousBlockHash !== previousBlock.hash) return false;
    }

    return true;
  }
}

module.exports = new Blockchain();
