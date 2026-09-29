import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Title from '../components/Title'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const paymentCode = state?.paymentCode || 'IR-000000'
  const paymentMethod = state?.paymentMethod || 'Selected payment method'

  return (
    <div className='border-t pt-14 min-h-[65vh]'>
      <div className='text-center text-2xl'>
        <Title text1='PAYMENT' text2='CONFIRMED' />
      </div>

      <div className='mx-auto my-12 max-w-xl border border-green-200 bg-green-50 px-8 py-12 text-center sm:px-12'>
        <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-2xl text-white'>
          ✓
        </div>
        <p className='mt-6 text-sm font-medium uppercase tracking-wide text-green-700'>
          Reference Code
        </p>
        <h1 className='mt-3 text-3xl font-semibold tracking-wide text-green-800'>
          {paymentCode}
        </h1>
        <p className='mx-auto mt-4 max-w-md text-sm leading-6 text-gray-600'>
          Your order was saved successfully using {paymentMethod}. Keep this code for your records.
        </p>

        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <button
            onClick={() => navigate('/orders')}
            className='border border-green-700 bg-green-700 px-8 py-3 text-sm text-white hover:bg-white hover:text-green-700 transition-all duration-500'
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/collection')}
            className='border border-gray-300 bg-white px-8 py-3 text-sm text-gray-700 hover:border-black transition-all duration-500'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
