import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    orderId: String,
    product: Object,
    address: Object,
    userId: String,
    amount: String,
    status: String,
    payer: Object,
    createTime: Date,
    updateTime: Date,
    links: Array,
    method: String
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;
