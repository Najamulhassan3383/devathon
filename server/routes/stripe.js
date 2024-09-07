import express from 'express';
import Payment from '../models/Payments.js';
import Stripe from 'stripe';

const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
    const { amount, id, name, email, address, product } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: id,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });
        if (payment.status === 'succeeded') {
            const newPayment = new Payment({
                orderId: payment.id,
                product,
                userId: name.firstName + payment.id + name.lastName,
                amount: amount / 100,
                status: payment.status,
                createTime: payment.created,
                updateTime: payment.created,
                address: {
                    country_code: address.country,
                    postal_code: address.zip,
                    admin_area_1: address.state,
                    admin_area_2: address.city,
                    address_line_1: address.line1,
                },
                payer: {
                    name: {
                        given_name: name.firstName,
                        surname: name.lastName
                    },
                    email_address: email,
                    payer_id: name.firstName + payment.id + name.lastName,
                },
                createTime: new Date(),
                updateTime: new Date(),
                links: [],
                method: 'stripe',
            });
            await newPayment.save();
            res.json({ success: true, message: 'Payment succeeded', payment: newPayment });
        } else {
            console.log(payment);
            res.json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: 'Payment failed' });
    }
});

export default router;
