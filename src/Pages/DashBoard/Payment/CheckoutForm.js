import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({data}) => {
    const [cardError,setCardError]=useState('');
    const [success,setSuccess]=useState('');
    const [processing, setProcessing]=useState(false);
    const [transactionId,setTransactionId]=useState('');
    const [clientSecret, setClientSecret] = useState("");
    const stripe=useStripe();
    const elements=useElements();
    const {price, email, patient, _id}=data;
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        
        },
          body: JSON.stringify({price }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [price]);

    const handleSubmit=async(event)=>{
               event.preventDefault();
               if(!stripe||!elements){
                return;
               }
               const card=elements.getElement(CardElement);
               if(card===null){
                  return;

               }

               const {error, paymentMethod}=await stripe.createPaymentMethod({
                type: 'card',
                card,
               })

               if(error){
                    console.log(error);
                    setCardError(error.message);
               }
               else{
                setCardError('');
               }

               setSuccess('');
               setProcessing(true);
               const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
                clientSecret,
                {
                  payment_method: {
                    card: card,
                    billing_details: {
                      name: patient,
                      email: email
                    },
                  },
                },
              );
              if(confirmError){
                setCardError(confirmError.message)
                return;
              }
             // console.log(paymentIntent);
             if(paymentIntent.status==="succeeded"){
               console.log('card info', card)
              //setProcessing(false);
              //store payment info in database
              const payment={

                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
              }
              fetch('http://localhost:5000/payments',{
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment),
              })
              .then(res=>res.json())
              .then(data=>{
                console.log(data);
                if(data.insertedId){
                  setSuccess('congrats! Your payment completed');
                  setTransactionId(paymentIntent.id);
                }
              })
              }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-sm mt-4b btn-primary' type="submit" 
        disabled={!stripe||!clientSecret||processing}>
          Pay
        </button>
      </form>
      <p className='text-red'>{cardError}</p>
      {
        success && <>
            <p className='text-green-500'>{success}</p>
            <p>your transaction Id : {transactionId}</p>
        </>
      }
        </>
    );
};

export default CheckoutForm;