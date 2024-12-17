import React, { useState } from 'react'
import Course from './Course';
import MyLearingSkeleten from '../skeleten/MyLearingSkeleten';

const MyLearning = () => {
    const [loading, setLoading] = useState(false);
    const myLearningCourses = [1,2,3];
  return (
    <div className='mt-24 container mx-auto px-4 md:px-0'>
        <h1 className='text-2xl  font-bold'>MyLearning</h1>
        <div className='my-5'>
            {
                loading ? <MyLearingSkeleten/> : myLearningCourses.length === 0 ? <p>You are not enrolled in any course</p>:(
                    <div className={`flex gap-4 flex-wrap lg:justify-normal justify-center ${myLearningCourses.length / 4 === 0 && "justify-center"}`}>
                        {
                            [1,2,3].map((course,index)=>{
                                return <Course key={index}/>
                            })
                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default MyLearning