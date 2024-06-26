import { Medal, ShieldCheck, Truck } from 'lucide-react';

const STRINGS = {
  appName: 'YoloHome',
  userSessionCard: {
    logout: 'Log out',
  },
  homepage: {
    title: 'YoloHome',
    nav: {
      home: 'Homepage',
      about: 'About us',
      login: 'Sign in',
    },
    promotion: {
      title: 'Get a free Free+True Skincare Bright Side ($25 value) with orders $125+.',
      callToAction: 'Start now!',
    },
    newArrival: {
      title: 'Fresh Arrivals Online',
      subTitle: 'Discover Our Newest Collection Today.',
      callToAction: 'View Collection',
    },
    features: [
      {
        title: 'Free Shipping',
        subTitle: "Upgrade your style today and get FREE shipping on all orders! Don't miss out.",
        icon: Truck,
      },
      {
        title: 'Satisfaction Guarantee',
        subTitle: 'Shop confidently with our Satisfaction Guarantee: Love it or get a refund.',
        icon: Medal,
      },
      {
        title: 'Secure Payment',
        subTitle: 'Your security is our priority. Your payments are secure with us.',
        icon: ShieldCheck,
      },
    ],
    featured: {
      title: 'Browse Our Fashion Paradise!',
      subTitle: 'Step into a world of style and explore our diverse collection of clothing categories.',
      callToAction: 'Start Browsing',
    },
  },
  login: {
    title: 'YoloHome',
    slogan: 'The future of authenticity.',
    form: {
      title: 'Sign In',
      email: {
        label: 'Username/Email',
        placeholder: 'Enter your email address',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter password',
      },
      forgetPassword: 'Forget password?',
      submit: 'Log in',
    },
    withGoogle: 'Sign in with Google',
  },
  'not-found': {
    title: 'Sorry, the page you are looking for does not exist.',
    return: 'Back to Homepage',
  },
};

export default STRINGS;
