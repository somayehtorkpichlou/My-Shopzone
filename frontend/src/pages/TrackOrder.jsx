import React from 'react'
import Title from '../components/Title'

const TrackOrder = () => {
  return (
    <div className='border-t pt-16 min-h-[50vh]'>
      <div className='text-2xl'>
        <Title text1={'TRACK'} text2={'ORDER'} />
      </div>

      <div className='flex items-center justify-center py-20 text-center'>
        <p className='text-lg sm:text-xl text-gray-700'>
          We are preparing your order.
        </p>
      </div>
    </div>
  )
}

export default TrackOrder
