import { loadStripe } from '@stripe/stripe-js';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(stripeKey);
  }
  return stripePromise;
}

export default getStripe;