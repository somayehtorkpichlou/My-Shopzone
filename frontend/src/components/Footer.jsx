import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

<div>
    <Link to='/'><img src={assets.logo} className='mb-5 w-32'alt="Shopzone" /></Link>
    <p className='w-full md:w-2/3 text-gray-600' >
        Discover everyday style made simple, with curated pieces, smooth shopping, and reliable delivery from Shopzone.
    </p>
</div>

<div>
  <p className='text-xl font-medium mb-5' >COMPANY</p>
  <ul className='flex flex-col gap-1 text-gray-600' >
     <li><Link className='hover:text-gray-900' to='/'>Home</Link></li>
     <li><Link className='hover:text-gray-900' to='/about'>About</Link></li>
     <li><Link className='hover:text-gray-900' to='/collection'>Collection</Link></li>
     <li><Link className='hover:text-gray-900' to='/contact'>Contact</Link></li>
  </ul>
</div>

    <div>
      <p className='text-xl font-medium mb-5' >GET IN TOUCH</p>
      <ul className='flex flex-col gap-1 text-gray-600'>
        <li>+98 21 1234 5678</li>
        <li>contact@shopzone.com</li>

      </ul>
    </div>

        </div>
          <div>
            <hr />
            <p className='py-5 text-sm text-center'> copyright 2026@ shopzone.com - All right Reserved</p>
          </div>

    </div>
  )
}

export default Footer
