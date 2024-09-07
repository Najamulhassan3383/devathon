import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addSecondsToISOString, countries, getCurrentISODateString } from './utills.js';
import { message } from 'antd';
import { SERVER_URL } from '../key.js';
import { useCookies } from 'react-cookie';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            backgroundColor: 'white',
            fontSize: '18px',
        },
    },
};
const PaymentForm = ({ email, data, openModal, setOpenModal,fetchTestSeries }) => {
    const [cookies] = useCookies(['x-auth-token']);
    const token = cookies['x-auth-token'];
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: event.target.firstName.value + ' ' + event.target.lastName.value,
                    email,
                    address: {
                        city: event.target.city.value,
                        country: event.target.country.value,
                        line1: event.target.address.value,
                        state: event.target.state.value,
                    },
                },
            });
            console.log("paymentMethod", paymentMethod);
            if (!error) {
                const { id } = paymentMethod;
                try {
                    const response = await axios.post(`${SERVER_URL}/stripe/create-payment-intent`, {
                        amount: parseInt(data.price) * 100,
                        id,
                        name: {
                            firstName: event.target.firstName.value,
                            lastName: event.target.lastName.value,
                        },
                        email,
                        address: {
                            city: event.target.city.value,
                            country: event.target.country.value,
                            line1: event.target.address.value,
                            state: event.target.state.value,
                            zip: paymentMethod.billing_details.address.postal_code,
                        },
                        product: data,
                    });
                    if (response.data.success) {
                        try {
                            const response = await axios.get(`http://localhost:5000/api/test-series/enrollInTestSeries/${data?._id}`, {
                                headers: {
                                    'x-auth-token': token, // Send the token for authentication
                                }
                            });
                            message.success(response.data.message); // Show success message
                            navigate(`/tests/${test?._Id}`); // Navigate to the test details page
                            fetchTestSeries();
                        } catch (error) {
                            console.error("Error enrolling in test series:", error);
                        }
                        setOpenModal(false);
                    } else {
                        navigate('/failure');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    navigate('/failure');
                }
            } else {
                console.error('Stripe error:', error.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <h1 className=' text-lg font-bold text-blue-800 mt-2'>Paying {data?.price} USD</h1>
            <form onSubmit={handleSubmit}>
                <input className='block w-full p-2 mb-2 outline-none border rounded-md' type="text" name="firstName" placeholder="First Name" required />
                <input className='block w-full p-2 my-2 outline-none border rounded-md' type="text" name="lastName" placeholder="Last Name" required />
                <input className='block w-full p-2 my-2 outline-none border rounded-md' type="text" name="address" placeholder="Address" required />
                <input className='block w-full p-2 my-2 outline-none border rounded-md' type="text" name="state" placeholder="State" required />
                <input className='block w-full p-2 my-2 outline-none border rounded-md' type="text" name="city" placeholder="City" required />
                <select className='block w-full p-2 my-2 outline-none border rounded-md' type="text" name="country" placeholder="Country" required >
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <div className='p-2 my-2 outline-none border rounded-md bg-white'>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                <div className='flex justify-end'>
                    <button className='bg-blue-600 p-2 px-4 text-white rounded-lg' type="submit" disabled={!stripe}>
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;