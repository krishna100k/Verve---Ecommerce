import StripeCheckout, { Token } from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import axios from "axios"



const Pay = () => {
  const key = "pk_test_51OD09rSCBYeXMCGHYdNUXlpe78oHBYfUiXDJgX50yybLQEyrBN9ZPsgritU2IF2mBZ7PgmKPRyh1nYBngs6IYbyE00szMMyd00"
  const [stripeToken, setStripeToken] = useState<null | Token>(null)

  const onToken = (token: Token) => {
    if(token){
      setStripeToken(token)
    }
  };

  useEffect(() => {
    const makeRequest = async () => {
      try{
        const response = await axios.post("http://localhost:3000/stripe/payment", 
        {
          token: stripeToken?.id,
          amount: 2000
        }
        )
        console.log(response.data)

      }catch(err){
        console.log(err)
      }
    }
    stripeToken && makeRequest
  }, [stripeToken])

  return (
    <div>
      <StripeCheckout
        name='Verve'
        image='/vite.svg'
        billingAddress
        shippingAddress
        description='Your Total is INR 20'
        amount={2000}
        token={onToken}
        stripeKey={key}
      />
    </div>
  );
};

export default Pay;
