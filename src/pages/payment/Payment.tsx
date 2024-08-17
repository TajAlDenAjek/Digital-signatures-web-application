import React from 'react'
import Stripe from './Stripe';

function Payment() {
  return (
    <>
        <h1 style={{marginBottom:'10px'}}> Payment </h1>
        
        <Stripe></Stripe>
    </>
  )
}

export default Payment