const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function connectToNetwork() {
    const ccpPath = path.resolve(__dirname, '..', 'config.json'); // Ajusta la ruta según sea necesario
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'wallet'); // Ajusta la ruta según sea necesario
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork('mychannel'); // Cambia 'mychannel' al nombre de tu canal
    const contract = network.getContract('my-chaincode'); // Cambia 'my-chaincode' al nombre de tu chaincode

    return { gateway, network, contract };
}

module.exports = { connectToNetwork };
