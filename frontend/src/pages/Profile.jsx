import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await axios.post(
          backendUrl + '/api/user/profile',
          {},
          { headers: { token } }
        )

        if (response.data.success) {
          setProfile(response.data.user)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    loadProfile()
  }, [backendUrl, navigate, token])

  return (
    <div className='border-t pt-10'>
      <div className='text-2xl mb-8'>
        <Title text1='MY' text2='PROFILE' />
      </div>

      <div className='max-w-xl border border-gray-200 p-6 text-gray-700'>
        <div className='flex flex-col gap-4'>
          <div>
            <p className='text-sm text-gray-500'>Name</p>
            <p className='font-medium'>{profile?.name || 'Loading...'}</p>
          </div>

          <div>
            <p className='text-sm text-gray-500'>Email</p>
            <p className='font-medium'>{profile?.email || 'Loading...'}</p>
          </div>

          <button
            onClick={() => navigate('/orders')}
            className='mt-4 w-fit border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all'
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
