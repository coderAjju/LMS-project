import React from 'react'
import Hero from '../components/student/Hero'
import { Courses } from '../components/student/Courses'
import useAuthstore from '@/zustand/useAuthStore'

const HomePage = () => {
  const {user} = useAuthstore();
  console.log("user: ",user)
  return (
    <div className='container mx-auto'>
        <Hero/>
        <Courses/>
    </div>
  )
}

export default HomePage