import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.jsx'; // Your custom checkout form component

const stripePromise = loadStripe('pk_test_51NC4M3G2rf1NMubQeLQNkFZhUHMuoyeHo5oIlRmSrx254kEcn3c1lFBq615gFK553n6iGnTZ7sonpUgujnT45k1Z00dRzQV0yn');


const Stripe = ({ data, email,openModal,setOpenModal,fetchTestSeries }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm openModal={openModal} fetchTestSeries={fetchTestSeries} setOpenModal={setOpenModal} data={data} email={email} />
        </Elements>
    )
}

export default Stripe