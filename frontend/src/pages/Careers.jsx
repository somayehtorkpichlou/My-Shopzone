import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'

const Careers = () => {
  const navigate = useNavigate()

  return (
    <div className='border-t pt-10'>
      <div className='text-center text-2xl'>
        <Title text1='CAREERS' text2='AT SHOPZONE' />
      </div>

      <div className='mx-auto my-12 max-w-3xl border border-gray-300 px-8 py-16 text-center sm:px-16 sm:py-20'>
        <p className='text-sm font-medium uppercase tracking-wide text-[#F2A7A5]'>
          Open Positions
        </p>
        <h1 className='mt-3 text-2xl font-medium text-gray-800 sm:text-3xl'>
          No open roles right now
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base'>
          We are not hiring at the moment, but Shopzone is always growing. Please check back later for future opportunities.
        </p>

        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <button
            onClick={() => navigate('/collection')}
            className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500'
          >
            Shop Collection
          </button>
          <button
            onClick={() => navigate('/contact')}
            className='border border-gray-300 px-8 py-3 text-sm text-gray-700 hover:border-black transition-all duration-500'
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default Careers
