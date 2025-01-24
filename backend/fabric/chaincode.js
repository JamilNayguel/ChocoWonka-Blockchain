const { connectToNetwork } = require('./network');

async function createTransaction(data) {
    const { gateway, contract } = await connectToNetwork();
    try {
        const result = await contract.submitTransaction('createTransaction', JSON.stringify(data)); // Cambia 'createTransaction' según tu chaincode
        console.log('Transaction has been submitted:', result.toString());
    } catch (error) {
        console.error('Failed to submit transaction:', error);
    } finally {
        gateway.disconnect();
    }
}

module.exports = { createTransaction };
