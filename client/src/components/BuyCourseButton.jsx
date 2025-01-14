import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react';
import axiosInstance from '@/lib/axios';

const BuyCourseButton = ({courseId}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleBuyCourse = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/api/purchase/checkout/create-checkout-session",{
        courseId
      })
      window.location.href = res.data.url
      
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Button onClick={handleBuyCourse}>
      {
        isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <p>Purchase course</p>
        )
      }
    </Button>
  )
}

export default BuyCourseButton