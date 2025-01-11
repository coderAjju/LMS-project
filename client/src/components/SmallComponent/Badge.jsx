import React from 'react'

const Badge = ({level}) => {
  return (
    <div className=' bg-blue-600 text-white px-2 py-1 text-xs rounded-full'>
        {level}
    </div>
  )
}

export default Badge