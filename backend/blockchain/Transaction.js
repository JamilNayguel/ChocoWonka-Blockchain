class Transaction {
    constructor(amount, sender, recipient = 'jhyssel2016@gmail.com') {
        this.amount = amount;         
        this.sender = sender;         
        this.recipient = recipient;   // Ahora puedes pasar el destinatario como argumento
        this.timestamp = Date.now();  
    }
    toJSON() {
        return {
            sender: this.sender,
            recipient: this.recipient,
            amount: this.amount
        };
    }
    
    
}

module.exports = Transaction;
