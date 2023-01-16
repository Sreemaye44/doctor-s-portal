import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)
const Payment = () => {
    const data=useLoaderData();
    const navigation=useNavigation();
    const{treatment, price, slot, selectedDate}=data;
    if(navigation.state==="loading"){
        return <loader></loader>
    }
   
    console.log('booking data', data);
    return (
        <div>
            <h3 className='text-3xl'>Payment for {treatment}</h3>
            <p className='text-xl'>Please pay <strong>${price} </strong> for your appointment on {selectedDate} at {slot}</p>

            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        data={data}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;